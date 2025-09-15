import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { QueryProviderWrapper } from "./components/QueryProviderWrapper";

export const metadata = {
  title: "EHR Integration Dashboard",
  description: "Dashboard for managing patients using Epic FHIR DSTU2 API",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <QueryProviderWrapper>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {/* Topbar */}
              <Topbar />

              {/* Page content */}
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
