import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      include: {
        category: true,
        account: true,
      },
      orderBy: { date: "desc" },
    });

    // CSV Header row
    let csvContent = "Date,Time,Type,Amount,Currency,Account,Category,Tags,Description\n";

    // Escape CSV cell content safely
    const escape = (str: string | null) => {
      if (!str) return "";
      const escapedStr = str.replace(/"/g, '""');
      return `"${escapedStr}"`;
    };

    transactions.forEach((tx) => {
      const date = tx.date.toISOString().split("T")[0];
      const time = tx.time || "";
      const type = tx.type;
      const amount = (tx.amount / 100).toFixed(2);
      const currency = tx.currency;
      const account = escape(tx.account.name);
      const category = escape(tx.category?.name || "Uncategorized");
      
      let parsedTags = "";
      try {
        parsedTags = JSON.parse(tx.tags).join(",");
      } catch (e) {
        parsedTags = tx.tags;
      }
      const tags = escape(parsedTags);
      const desc = escape(tx.description);

      csvContent += `${date},${time},${type},${amount},${currency},${account},${category},${tags},${desc}\n`;
    });

    const headers = new Headers();
    headers.set("Content-Type", "text/csv");
    headers.set("Content-Disposition", 'attachment; filename="mawallet-export.csv"');

    return new NextResponse(csvContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Export failed:", error);
    return new NextResponse("Failed to export data", { status: 500 });
  }
}
