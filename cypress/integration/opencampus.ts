const courseId = 194;
const tutorName = "Buck, Basti";
const start = "18:00";
const end = "20:00";

const lessons = [
  {
    title: "Lesson 02 - HTML",
    date: "19.04.2021",
  },
  {
    title: "Lesson 03 - HTML & CSS",
    date: "26.04.2021",
  },
  {
    title: "Lesson 04 - CSS",
    date: "03.05.2021",
  },
  {
    title: "Lesson 05 - Webentwicklung angewandt",
    date: "10.05.2021",
  },
  {
    title: "Lesson 06 - JS I",
    date: "17.05.2021",
  },
  {
    title: "Lesson 07 - JS II",
    date: "31.05.2021",
  },
  {
    title: "Lesson 08 - Responsive Webdesign",
    date: "07.06.2021",
  },
  {
    title: "Lesson 09 - Frameworks & Projektarbeit",
    date: "14.06.2021",
  },
  {
    title: "Lesson 10 - Projektarbeit",
    date: "21.06.2021",
  },
  {
    title: "Lesson 11 - Präsentationen",
    date: "05.07.2021",
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
