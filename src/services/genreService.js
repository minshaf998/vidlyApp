import http from "./httpService";

export async function getGenres() {
  return await http.get("/genres");
}
