import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A demo project using Next.js and ImageKit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
