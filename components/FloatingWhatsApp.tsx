export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hello Aarvya Naturals,\n\nI'm interested in your products. Could you please share your latest catalogue and pricing?\n\nThank you."
  );

  return (
    <a
      href={`https://wa.me/916374626691?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl px-6 py-4 transition duration-300"
    >
      💬 WhatsApp
    </a>
  );
}