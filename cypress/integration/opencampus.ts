const courseId = 245;
const tutorName = "Daniel Banck, Basti Buck &";
const start = "18:00";
const end = "20:00";

const lessons = [
  {
    title: "Lektion 01",
    date: "19.04.2022",
  },
  {
    title: "Lektion 02",
    date: "25.04.2022",
  },
  {
    title: "Lektion 03",
    date: "02.05.2022",
  },
  {
    title: "Lektion 04",
    date: "09.05.2022",
  },
  {
    title: "Lektion 05",
    date: "16.05.2022",
  },
  {
    title: "Lektion 06",
    date: "23.05.2022",
  },
  {
    title: "Lektion 07",
    date: "30.05.2022",
  },
  {
    title: "Lektion 08",
    date: "07.06.2022",
  },
  {
    title: "Lektion 09",
    date: "13.06.2022",
  },
  {
    title: "Lektion 10",
    date: "20.06.2022",
  },
  {
    title: "Lektion 11",
    date: "27.06.2022",
  },
];

it("create all opencampus events", () => {
  cy.viewport(1280, 900);

  cy.visit("https://edu.opencampus.sh/users/sign_in");

  cy.log("Enter your credentials manually, login and hit continue at the top!");
  cy.pause();

  lessons.forEach((lesson) => {
    cy.visit(`https://edu.opencampus.sh/admin/add_event?id=${courseId}`);

    cy.findByPlaceholderText(/Titel eingeben/i).type(lesson.title);
    cy.findAllByPlaceholderText(/datum/i).each(($date) => {
      cy.wrap($date).type(lesson.date);
      cy.get("body").click(1200, 400);
    });

    cy.findAllByPlaceholderText(/zeit/i).each(($time, index) => {
      switch (index) {
        case 0:
          cy.wrap($time).type(start);
          cy.get("body").click(1200, 400);
          break;

        case 1:
          cy.wrap($time).type(end);
          cy.get("body").click(1200, 400);
          break;

        default:
          break;
      }
    });

    cy.get("#referent_id").select(tutorName);

    cy.findByRole("button", { name: /Event hinzufügen/i }).click();

    cy.findByText(/Neues Event erfolgreich erstellt/i, { timeout: 20000 });
  });
});
