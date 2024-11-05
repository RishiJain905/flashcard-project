import pool from "../db.js";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const insertGroup = async (group, user_id) => {
  const newGroup = await pool.query(
    "INSERT INTO flashcard_groups(title, subject, user_id) VALUES($1, $2, $3) RETURNING *",
    [group.title, group.subject, user_id]
  );
  return newGroup;
};
const updateGroup = async (title, subject, user_id) => {
  const newGroup = await pool.query(
    "UPDATE flashcard_groups SET title = $1, subject = $2 WHERE user_id = $3 RETURNING *",
    [title, subject, user_id]
  );
  return newGroup;
};
const insertFlashcard = async (card) => {
  let newCard;
  if (card.cardType === "mcq") {
    newCard = await pool.query(
      "INSERT INTO mcq_cards(title, mastery, option1, option2, option3, option4, answer, group_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        card.title,
        card.mastery,
        card.options[0],
        card.options[1],
        card.options[2] ? card.options[2] : null,
        card.options[3] ? card.options[3] : null,
        card.answer,
        card.group_id,
      ]
    );
  } else if (card.cardType === "flashcard") {
    newCard = await pool.query(
      "INSERT INTO basic_cards(title, mastery, answer, group_id) VALUES($1, $2, $3, $4) RETURNING *",
      [card.title, card.mastery, card.description, group_id]
    );
  } else {
    newCard = await pool.query(
      "INSERT INTO t_f_cards(title, mastery, answer, group_id) VALUES($1, $2, $3, $4) RETURNING *",
      [card.title, card.mastery, card.answer, group_id]
    );
  }
  return newCard;
};

const updateFlashcard = async (card) => {
  let newCard;
  if (card.cardType === "mcq") {
    newCard = await pool.query(
      "UPDATE mcq_cards SET title = $1, mastery = $2, option1 = $3, option2 = $4, option3 = $5, option4 = $6, answer = $7 WHERE group_id = $8 and id = $9 RETURNING *",
      [
        card.title,
        card.mastery,
        card.options[0],
        card.options[1],
        card.options[2] ? card.options[2] : null,
        card.options[3] ? card.options[3] : null,
        card.answer,
        card.group_id,
        card.id,
      ]
    );
  } else if (card.cardType === "flashcard") {
    newCard = await pool.query(
      "UPDATE basic_cards SET title = $1, mastery = $2, answer = $3 WHERE group_id = $4 and id = $5 RETURNING *",
      [
        card.title,
        card.mastery,
        card.description,
        card.group_id,
        card.id,
      ]
    );
  } else {
    newCard = await pool.query(
      "UPDATE t_f_cards SET title = $1, mastery = $2, answer = $3 WHERE group_id = $4 and id = $5 RETURNING *",
      [
        card.title,
        card.mastery,
        card.answer,
        card.group_id,
        card.id,
      ]
    );
  }
  return newCard;
};

//Actual controller functions
export const postFlashcard = async (req, res) => {
  const { card } = req.body;
  try {
    const newCard = await insertFlashcard(card);
    return res.status(201).json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteFlashcard = async (req, res) => {
  const { type, id, group_id } = req.params;
  let db = "basic_cards";
  if (cardType === "mcq") {
    db = "mcq_cards";
  }
  if (cardType === "t_f") {
    db = "t_f_cards";
  }
  try {
    const card = await pool.query(
      `DELETE FROM ${db} WHERE id = $1 AND group_id = $2`,
      [id, group_id]
    );
    return res.status(200).json(card.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const postGroup = async (req, res) => {
  const { group } = req.body;
  try {
    const newGroup = await insertGroup(group, req.user.id);
    return res.status(201).json(newGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await pool.query(
      "DELETE FROM flashcard_groups WHERE id = $1 CASCADE",
      [id]
    );
    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const upsertGroup = async (req, res) => {
  const { title, subject, cards } = req.body;
  try {
    const newGroup = await updateGroup(title, subject, req.user.id);

    const groupId = newGroup.rows[0].id;
    for (let i = 0; i < cards.length; i++) {
      await updateFlashcard(cards[i]);
    }
    return res.status(201).json(newGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await pool.query(
      "SELECT * FROM flashcard_groups WHERE user_id = $1",
      [req.user.id]
    );
    return res.status(200).json(groups.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// export const getGroup = async (req, res) => {
//   try {
//     const group = await pool.query(
//       "SELECT * FROM flashcard_groups WHERE id = $1 and user_id = $2",
//       [req.params.id, req.user.id]
//     );
//     return res.status(200).json(group.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

export const getCards = async (req, res) => {
  try {
    let cards = await pool.query(
      "SELECT * FROM basic_cards WHERE group_id = $1 and user_id = $2",
      [req.params.id, req.user.id]
    );
    cards += await pool.query(
      "SELECT * FROM mcq_cards WHERE group_id = $1 and user_id = $2",
      [req.params.id, req.user.id]
    );
    cards += await pool.query(
      "SELECT * FROM t_f_cards WHERE group_id = $1 and user_id = $2",
      [req.params.id, req.user.id]
    );
    return res.status(200).json(cards.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// export const getCard = async (req, res) => {
//   try {
//     const queries = [
//       pool.query("SELECT * FROM basic_cards WHERE id = $1", [req.params.id]),
//       pool.query("SELECT * FROM mcq_cards WHERE id = $1", [req.params.id]),
//       pool.query("SELECT * FROM t_f_cards WHERE id = $1", [req.params.id]),
//     ];
//     const card = await Promise.all(queries);
//     for (const c of card) {
//       if (c.rows.length > 0) {
//         return res.status(200).json(c.rows[0]);
//       }
//     }

//     return res.status(200).json(card.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };
