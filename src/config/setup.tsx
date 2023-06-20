export const setup = {
    name: "TiemHommie",
    navigationColor: "#FEAFA2",
    color: "white",
    banner: "/assets/images/banner.jpg",
    error: "rgb(211, 47, 47)",
    success: "rgb(46, 125, 50)",
    email: "cskg.tiemhommie@gmail.com",
    colorCode: "rgb(254, 175, 162)"
}
export const category = [
    { name: "Đồ chơi", url: ""},
    { name: "Đồ nhồi bông", url: ""},
    { name: "Trang sức", url: ""},
    { name: "Đồ trang trí", url: ""},
]

export const productStatus = [
    { name: "Bán chạy"},
    { name: "Hàng mới"}
]
export const block = (inputString: any) => {
    const sanitizedString = inputString.replace(/[^a-zA-Z0-9À-ÿ\s]/g, '');
    return sanitizedString === inputString ? inputString : "";
  };
  
  
  
  
  
  
  