import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import Overview from "./_components/Overview";
import History from "./_components/History";
import { DownloadIcon } from "lucide-react";
import { jsPDF } from "jspdf";

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  function generatePDF() {
    const doc = new jsPDF();

    // PDF'e metin ekle
    doc.text("Hello, this is your PDF content!", 10, 10);

    // Örnek bir tablo veya başka içerikler eklenebilir
    doc.text("Generated dynamically with jsPDF.", 10, 20);

    // PDF'i indir
    doc.save("example.pdf");
  }

  return (
    <div className="h-full bg-background ">
      <div className="border-b bg-card">
        <div className=" flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋 </p>
          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New Income 🤑
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                >
                  New Expense 😤
                </Button>
              }
              type="expense"
            />
            <Button
              variant={"outline"}
              className="border-emerald-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
              onClick={generatePDF}
            >
              <DownloadIcon />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
}

export default page;
