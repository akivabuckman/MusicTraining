const getData = async () => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log(data);
    render(data);
  } catch (err) {
    console.log(err);
  }
};
getData();

const fetchData = async (value) => {
  try {
    const res = await fetch(`/api/products/search?name=${value}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const searchInput = async () => {
  const val = document.getElementById("seacrh-input").value;
  const data = await fetchData(val);
  render(data);
  //   try {
  //     const res = await fetch(`/api/products/search?name=${val}`);
  //     const data = await res.json();
  //     render(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
};

const add = async () => {
  const name = document.getElementById("name-input").value;
  const price = document.getElementById("price-input").value;
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    const data = await res.json();
    render(data);
  } catch (err) {
    console.log(err);
  }
};

const deleteInput = async () => {
  const id = document.getElementById("delete-input").value;
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);
    getData()
  } catch (err) {
    console.log(err);
  }
};

const render = (arr) => {
  const html = arr.map((item) => {
    return `<div style="display:inline-block;margin:20px;padding:20px;border:1px solid #ccc;">
        <h2>${item.name}</h2>
        <h4>${item.price}</h4>
    </div>`;
  });
  document.getElementById("root").innerHTML = html.join("");
};
