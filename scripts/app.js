"use strict";
/**
 *  -----------------------------
 *  - Global Variables -
 *  -----------------------------
 */

// const END_POINT = "http://127.0.0.1:8080/send-mail";
const END_POINT = "https://express-mailer-thamudi.herokuapp.com/send-mail";

class MailBody {
  constructor(fname, lname, email, subj, msg) {
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.subject = subj;
    this.message = msg;
    this.stringifiedData = this.stringifyData();
  }

  stringifyData() {
    return JSON.stringify(this);
  }
}

/**
 *  -----------------------------
 *  - Event Listeners Functions -
 *  -----------------------------
 */

function sendMail(event) {
  // send mail using fetch API
  event.preventDefault();

  const mail = new MailBody(
    event.target.fname.value,
    event.target.lname.value,
    event.target.email.value,
    event.target.subj.value,
    event.target.msg.value
  );

  (async () => {
    const rawResponse = await fetch(END_POINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: mail.stringifiedData,
    });
    const content = await rawResponse.json();

    content.status
      ? renderMessage("modal-success")
      : renderMessage("modal-fail");
  })();
}

/**
 *  --------------------
 *  - Render Functions -
 *  --------------------
 */
function toggleInfo(event) {
  // toggles slides info to show
  const paths = event.path; // get the paths of all the possible elements within the clicked event

  paths.forEach((path) => {
    if (path.className) {
      // check if the current path has a class

      if (path.className.includes("info")) {
        path.classList.toggle("active");
      }

      if (
        path.className.includes("active") &&
        path.className.includes("slide")
      ) {
        // check if its an active slide and add an overlay
        path.classList.toggle("overlay"); // toggle on/ off the overlay
      }

      if (path.className.includes("intro")) {
        // check if its the parent element and show the text

        // not working ??
        // path.children.forEach(child => {
        //     console.log(child);
        // });

        const child = path.children[1];
        child.classList.toggle("z-in-show"); // toggle on/ off the z-index of the text
      }
    }
  });
}

function renderMessage(modalId) {
  let count = 0;

  const loop = setInterval(() => {
    if (count <= 1) {
      document.getElementById(modalId).classList.toggle("opa-show");
      count++;
    } else {
      clearInterval(loop);
    }
  }, 2000);
}

/**
 *  -------------------
 *  - Event listeners -
 *  -------------------
 */

document.getElementById("contact-me").addEventListener("submit", sendMail);
