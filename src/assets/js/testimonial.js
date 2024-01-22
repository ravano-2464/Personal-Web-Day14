// class Testimonial {
//     constructor(name, review, image) {
//         this.name = name
//         this.review = review
//         this.image = image
//     }

//     html() {
//         return `
//             <div class="testimonial">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.review}"</p>
//                 <p class="author">- ${this.name}</p>
//             </div>
//         `
//     }
// }

// // class AuthorTestimonial extends Testimonial {
// //     constructor(author, review, image) {
// //         super(author, review, image)
// //         this.author = author
// //     }


// // }

// // class CompanyTestimonial extends Testimonial {
// //     constructor(author, review, image) {
// //         super(author, review, image)
// //         this.author = author
// //     }


// // }

// const testimonial1 = new Testimonial("Bayu", "Saya bangga dengan Chelsea", "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
// const testimonial2 = new Testimonial("Hima", "Saya bangga dengan City", "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
// const testimonial3 = new Testimonial("Tayo", "Saya malu dengan MU", "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")

// const testimonials = [testimonial1, testimonial2, testimonial3]

// let testimonialHTML = ``
// for(let index = 0; index < testimonials.length; index++) {
//     testimonialHTML += testimonials[index].html()
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML

const testimonialDataUrl = 'https://api.npoint.io/2017734110c4bc68e0fb';

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function generateTestimonialHTML(item, additionalInfoCallback) {
  let html = `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.content}"</p>
    <p class="author">- ${item.author}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>`;

  if (additionalInfoCallback) {
    html += additionalInfoCallback(item);
  }

  html += `</div>`;

  return html;
}

async function allTestimonials() {
  try {
    const testimonialData = await fetchData(testimonialDataUrl);
    let testimonialHTML = "";
    for (const key in testimonialData) {
      testimonialHTML += generateTestimonialHTML(testimonialData[key]);
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (error) {
    console.error("Error displaying testimonials:", error);
  }
}

async function filterTestimonials(rating, additionalInfoCallback) {
  try {
    const testimonialData = await fetchData(testimonialDataUrl);
    let testimonialHTML = '';
    for (const key in testimonialData) {
      if (testimonialData.hasOwnProperty(key) && testimonialData[key].rating === rating) {
        const item = testimonialData[key];
        testimonialHTML += generateTestimonialHTML(item, additionalInfoCallback);
      }
    }

    if (testimonialHTML === '') {
      testimonialHTML = `<h3>Data not found!</h3>`;
    }

    document.getElementById('testimonials').innerHTML = testimonialHTML;
  } catch (error) {
    console.error("Error filtering testimonials:", error);
  }
}

async function additionalInfo(item) {
  return `<p class="additional-info">High Rating Testimonial</p>`;
}

allTestimonials();
