
export default function NotFoundPage() {
    return (
        <div>
            <div>404</div>
            <div>Aradığınız sayfa bulunamadı. Lütfen önceki sayfaya gidin.</div>
            <div className="bg-blue-700 text-white py-1 px-2 rounded-lg" onClick={() => window.history.back()}>Önceki Sayfa</div>
        </div>
    );
}