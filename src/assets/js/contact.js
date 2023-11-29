function submitData() {
    const inputName = document.getElementById("inputName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPhone = document.getElementById("inputPhone").value;
    const inputSubject = document.getElementById("inputSubject").value;
    const inputMessage = document.getElementById("inputMessage").value;

    if (inputName === "") {
        alert('Name must be filled out');
    } else if (inputEmail === "") {
        alert('Email must be filled out');
    } else if (inputPhone === "") {
        alert('Phone number must be filled out');
    } else if (inputSubject === "") {
        alert('Subject must be filled out');
    } else if (inputMessage === "") {
        alert('Message must be filled out');
    } else {
       
        console.log(`Name: ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputPhone}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`);

        const mailtoLink = `mailto:ravanoganteng123@gmail.com?subject=${inputSubject}&body=${inputMessage}`;

        window.location.href = mailtoLink;
    }
}
