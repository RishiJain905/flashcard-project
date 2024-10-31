export default function QuizCard({card}) {
    return (
        <div className="quizCard">
            <h2>Card</h2>
            <h3>{card.title}</h3>
        </div>
    );
}