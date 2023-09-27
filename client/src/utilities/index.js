import axios from "axios";
import { routes } from "@/constants";

const router = axios.create({ baseURL: routes.locale });

export const GET_PRODUCTS = async () => await router.get("/");
