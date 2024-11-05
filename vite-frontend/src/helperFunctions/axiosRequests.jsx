import axios from "axios";

export async function register(values, route) {
  try {
    const response = axios.post(
      "http://localhost:5000/api/auth/" + route,
      values
    );
    console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("fname", JSON.stringify(response.data.user.fname));
    localStorage.setItem("lname", JSON.stringify(response.data.user.lname));
    localStorage.setItem("email", JSON.stringify(response.data.user.email));
  } catch (err) {
    throw err;
  }
}

export async function postCard(card) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/groups/${card.group_id}/cards`,
      card,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCard(card) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/cards/groups/${card.group_id}/${card.cardType}/${card.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function postGroup(group) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/groups",
      group,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteGroup(group) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/groups/${group.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCards(groupsFormik, groupDisplayed) {
  console.log(groupsFormik.values.userGroups[groupDisplayed], groupDisplayed);

  if (
    !groupsFormik.values.userGroups ||
    groupsFormik.values.userGroups[groupDisplayed].status === "old"
  ) {
    return;
  }
  const group = groupsFormik.values.userGroups[groupDisplayed];
  group.cards = group.cards.filter((card) => card.status !== "old");
  try {
    const response = await axios.put(
      "http://localhost:5000/api/groups",
      group,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    groupsFormik.setFieldValue(`userGroups.${groupDisplayed}.status`, "old");
    for (
      let i = 0;
      i < groupsFormik.values.userGroups[groupDisplayed].cards.length;
      i++
    ) {
      groupsFormik.setFieldValue(
        `userGroups.${groupDisplayed}.cards.${i}.status`,
        "old"
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getGroups() {
  try {
    const response = await axios.get("http://localhost:5000/api/groups", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCards(group_id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/groups/${group_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
