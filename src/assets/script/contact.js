function submitData(e) {
  e.preventDefault();
  const name = document.getElementById("exampleInputName").value;
  const email = document.getElementById("exampleInputEmail").value;
  const phoneNumber = document.getElementById("exampleInputNumber").value;
  const subject = document.getElementById("select").value;
  const message = document.getElementById("floatingTextarea2").value;

   if (name === "") {
        alert('Name Must Be Filled Out!!!');
    } else if (email === "") {
        alert('Email Must Be Filled Out!!!');
    } else if (phoneNumber === "") {
        alert('Phone Number Must Be Filled Out!!!');
    } else if (subject === "") {
        alert('Subject Must Be Filled Out!!!');
    } else if (message === "") {
        alert('Message Must Be Filled Out!!!');
    } else {
}

  console.log(name);
  console.log(email);
  console.log(phoneNumber);
  console.log(subject);
  console.log(message);

  let a = document.createElement("a");
  console.log(`Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`);
  a.href = `mailto:ravanoganteng123@gmail.com?subject=${subject}&body=${encodeURIComponent(
    `${message}, nama saya ${name}, kontak saya di ${email}`
  )}`;
  a.click();
}