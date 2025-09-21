import { ConvexClientProvider } from "../ConvexClientProvider";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
