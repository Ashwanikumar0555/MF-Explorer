import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 border-t mt-10">
      &copy; {new Date().getFullYear()} Mutual Fund Explorer. All rights reserved.
    </footer>
  );
}
