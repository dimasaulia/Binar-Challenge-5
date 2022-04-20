const model = document.querySelector(".model");
const model_close = document.querySelector(".delete-cancel");
const model_confirm = document.querySelector(".delete-confirm");

const btn_size = document.querySelectorAll(".btn-size");
const btn_size_small = document.querySelector("#size-small");
const btn_size_medium = document.querySelector("#size-medium");
const btn_size_large = document.querySelector("#size-large");
const btn_size_all = document.querySelector("#size-all");

const dashboard_container = document.querySelector(".dashboard__cars");

const func_delete = () => {
  const btn_delete = document.querySelectorAll(".btn-delete");
  btn_delete.forEach((d) => {
    d.addEventListener("click", () => {
      model.classList.add("active");
      setTimeout(() => {
        model.classList.add("opacity");
      }, 100);
      console.log(d.dataset.car_id);
      model_confirm.setAttribute("href", `/api/delete/${d.dataset.car_id}`);
    });
  });
};

func_delete();

model_close.addEventListener("click", () => {
  model.classList.remove("opacity");
  setTimeout(() => {
    model.classList.remove("active");
  }, 600);
});

// DATA FETCH AND RENDER
const html = (d) => {
  const template = `
              <div class="card p-3 mb-4 me-4 shadow-sm" style="width: 25rem;">
                  <img
                    src=${d.foto}
                    class="card-img-top mt-5 mb-5"
                    alt="Gambar Mobil"
                  />
                  <div class="card-body">
                    <h6 class="card-title mb-2"> ${d.name} </h6>
                    <h5 class="card-text fw-bolder mb-2">Rp
                      ${d.price}
                      / Hari</h5>
                    <p
                      class="card-text fw-normal mb-5 d-flex align-items-center"
                    >
                      <img
                        src="static/img/icon--clock.svg"
                        alt="Clock Icon"
                        class="me-2"
                        style="display: inline-block; width: 18px;"
                      />
                      Update at
                      ${d.updatedAt}

                    </p>

                    <div class="d-flex justify-content-between mb-4">
                      <a
                        data-car_id="${d.id}"
                        class="btn-delete btn text-danger d-flex align-items-center justify-content-evenly px-xl-4 px-md-3 py-xl-3 py-md-2"
                      >
                        <img
                          src="static/img/icon--trash.svg"
                          alt="Delete Icon"
                          style="width: 18px !important; display: inline-block;"
                        />
                        Delete
                      </a>

                      <a
                        href="/update?id=${d.id}"
                        class="btn btn-success text-light d-flex align-items-center justify-content-evenly px-xl-4 px-md-3 py-xl-3 py-md-2"
                      >
                        <img
                          src="static/img/icon--edit.svg"
                          alt="Edit Icon"
                          style="width: 18px !important; display: inline-block;"
                        />
                        Update
                      </a>
                    </div>
                  </div>
                </div>
  `;
  return template;
};

const renderData = (cars) => {
  cars.forEach((car) => {
    dashboard_container.insertAdjacentHTML("beforeend", html(car));
  });
  func_delete();
};

const render_size = (size, btn) => {
  const url =
    size.toLowerCase() !== "all"
      ? `http://localhost:8080/api/filter/${size}`
      : `http://localhost:8080/api/cars`;
  btn.addEventListener("click", () => {
    dashboard_container.innerHTML = "";
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        renderData(data);
      });
  });
  console.log("WORK");
};

render_size("small", btn_size_small);
render_size("medium", btn_size_medium);
render_size("large", btn_size_large);
render_size("all", btn_size_all);

const btn_size_remove_active = () => {
  btn_size.forEach((btn) => {
    btn.classList.remove("btn-size-active");
  });
};

btn_size.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn_size_remove_active();
    btn.classList.add("btn-size-active");
  });
});
