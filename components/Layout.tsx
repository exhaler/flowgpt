interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto py-4">
      <div>
        <main className="w-full overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
