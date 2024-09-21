import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  //Testing Groups
  const groups = [];
  const groupIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000000000000));

  for (let i = 0; i < 10; i++) {
    let cards = [];
    let cardIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000000000000));

    for (let j = 0; j < 10; j++) {
      let card = {
        id: cardIds[j],
        title: `Group ${i} Card ${j}`,
      };

      if (j % 3 === 0) {
        card.cardType = "flashcard";
        card.description = "Lorem Ipsum is simply dummy text...";
      } else if (j % 2 === 0) {
        card.cardType = "mcq";
        card.options = ["a", "b", "c"];
        card.answer = 0;
      } else {
        card.cardType = "t/f";
        card.options = ["a", "b"];
        card.answer = 1;
      }
      
      cards.push(card);
    }


    groups.push({
      id: groupIds[i],
      subject: "English",
      title: `Group ${i}`,
      cards: cards,
    });
  }



  const userInfo = {
    name: "Asad Mirza",
    email: "asadbmirza@gmail.com",
    groups: groups,
  };
  return <Dashboard userInfo={userInfo} />;
}

export default App;
