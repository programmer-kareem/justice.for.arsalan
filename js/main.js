let navPara = document.querySelector("#navPara");
let informationPara = document.querySelector("#informationPara");
let languageSelectorDropdown = document.querySelector("#languageSelectorDropdown");
let caseHeading = document.querySelector("#caseHeading");
let externalDetails = document.querySelector("#externalDetails");
let helpingPara = document.querySelector("#helpingPara");
let helpingHeading = document.querySelector("#helpingHeading");
let usernameInput = document.querySelector("#usernameInput")
let termsAndConditionPara = document.querySelector("#TNC");
let emailCounterPara = document.querySelector("#emailCounterPara");
let counterNote = document.querySelector("#counterNote");
let infoAboutUs = document.querySelector("#infoAboutUs");
let selectLanguageText = document.querySelector("#selectLanguageText");
let informationParagraphs = document.querySelectorAll(".victimInfo");
let informationCount = 0;
let emailCount;
let lang = "en";

window.addEventListener("load", () => {
  loadLanguage(lang);
  loadInformation()
});

languageSelectorDropdown.addEventListener("change", () => {
  lang = languageSelectorDropdown.value;
  loadLanguage(lang);
  
});

function loadLanguage(lang) {
  fetch(`data/lang_${lang}.json`)
    .then(response => response.json())
    .then(data => {
      navPara.innerText = data.navTitle;
      informationPara.innerText = data.caseDescription;
      caseHeading.innerText = data.aboutCaseHeading;
      externalDetails.innerText = data.externalDetails;
      helpingPara.innerText = data.helpText;
      helpingHeading.innerText = data.helpHeading;
      usernameInput.placeholder = data.namePlaceholder;
      termsAndConditionPara.innerText = data.terms;
      emailCounterPara.innerText = `${data.emailCounterLabel} ${emailCount}`;
      counterNote.innerText = data.counterNote;
      infoAboutUs.innerText = data.disclaimer;
      selectLanguageText.innerText = data.selectLanguage;
      emailCount = data.emailCount
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
let checkbox = document.querySelector("#termsAndConditionCheckbox");
let sendEmailBtn = document.querySelector("#sendEmailBtn");
let emailButtonActivator;
let isTermsAccepted = false;

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    sendEmailBtn.disabled = false;
    sendEmailBtn.style.color = "black";
    sendEmailBtn.style.backgroundColor = "white";
  }
  else {
    sendEmailBtn.disabled = true;
    sendEmailBtn.style.color = "white";
    sendEmailBtn.style.backgroundColor = "#C2C2C2";
    
  }
});
//system for fetching victim informations from common.json


function loadInformation() {
  fetch("data/common.json")
    .then(res => res.json())
    .then(data => {
      informationParagraphs[0].innerText = data.victimsName;
      informationParagraphs[1].innerText = data.victimsAge;
      informationParagraphs[2].innerText = data.victimsUniversity;
      informationParagraphs[3].innerText = data.victimsFather;
      informationParagraphs[4].innerText = data.victimsLocality || "";
    })
    .catch(err => console.error(err));
}
sendEmailBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  
  if (!username) {
    alert("Please enter your name");
    return;
  }
  
  if (!checkbox.checked) {
    alert("Please accept the terms first");
    return;
  }
  
  const recipients = "registry@supremecourt.gov.in,dgp.cg@gov.in";
  const subject = "Request for fair and transparent investigation";
  
  const body = `Respected Sir/Madam,

My name is ${username}, and I am writing as a concerned citizen of India.

I wish to respectfully draw your attention to the death of Arsalan Ansari, a student of Guru Ghasidas University. As reported by multiple news outlets, the incident is currently under investigation, and the family has raised concerns regarding the handling of the case.

I humbly request that the concerned authorities ensure a fair, transparent, and time-bound investigation so that justice may be served.

Thank you for your time and consideration.

Yours sincerely,
${username}`;
  
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Mobile → open mail app (Gmail / Mail)
    window.location.href =
      `mailto:${recipients}?subject=${encodedSubject}&body=${encodedBody}`;
  } else {
    // Desktop → Gmail Web (prefilled)
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${recipients}` +
      `&su=${encodedSubject}` +
      `&body=${encodedBody}`;
    
    const tab = window.open(gmailUrl, "_blank");
    
    // Fallback if popup blocked
    if (!tab) {
      window.location.href =
        `mailto:${recipients}?subject=${encodedSubject}&body=${encodedBody}`;
    }
  }
});