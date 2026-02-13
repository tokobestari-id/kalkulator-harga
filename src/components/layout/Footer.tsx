export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-12">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <p className="text-xs text-gray-400 text-center">
          Biaya marketplace dapat berubah sewaktu-waktu. Selalu cek{" "}
          <a
            href="https://seller.shopee.co.id"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Shopee Seller Center
          </a>
          {" "}dan{" "}
          <a
            href="https://seller.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            TikTok Seller Center
          </a>
          {" "}untuk informasi terbaru.
        </p>
      </div>
    </footer>
  );
}
