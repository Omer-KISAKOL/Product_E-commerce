
export default function NotFoundPage() {
    return (
        <div>
            <div>404</div>
            <div>Oops! The page you're looking for doesn't exist.</div>
            <div onClick={() => window.history.back()}>Go Back</div>
        </div>
    );
}