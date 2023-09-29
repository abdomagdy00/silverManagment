import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import { Loading, Error, Alert } from "@/layout";
import "./styles/get-products.scss";

const headers = ["تحكم", "العدد", "الاسم", "الوزن", "سعر الجرام", "الاجمالي", "نوع الفضه", "القسم", "الحجر", "التفاصيل"];
export const GetProducts = () => {
	const { data, loading, error, refetch } = useAxios();
	const { isSubmitted, refetch: deleteRefetch } = useAxios();
	const [alert, setAlert] = useState({ state: "", message: "" });
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			await refetch("get", "/products/get-products?name&count&weight&price&silverType&catagory&gem&description&customePrice");
		})();
	}, [isSubmitted]);

	const handleEdit = (product) => {
		navigate("./update-product", { state: product });
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm("هل انت متاكد من حذف هذا المنتج؟");
		if (!confirm) return;

		const { data, loading, error } = await deleteRefetch("delete", `/products/delete-product/${id}`);
		setTimeout(() => setAlert(() => ({ state: "", message: "" })), 2000);

		if (!loading && !error) setAlert(() => ({ state: "success", message: data?.success }));
		if (!loading && error) setAlert(() => ({ state: "error", message: data?.error }));
	};

	const tableOptions = {
		headers,
		footer: ["اجمالي سعر المخزن"],
		tableTitle: "عرض المنتجات",
		prices: [data?.totalPrice || 0],
	};

	if (loading) return <Loading />;
	if (error) return <Error />;

	return (
		<div className="get-products">
			{alert?.state === "success" && <Alert success message={alert.message} />}
			{alert?.state === "error" && <Alert error message={alert.message} />}

			<Table {...tableOptions}>
				{data?.result?.map(({ _id, name, count, weight, price, silverType, customePrice, catagory, gem, description }, i) => (
					<tr key={i} style={{ background: i % 2 ? "" : "rgba(147, 14, 132, 0.1)", color: +count === 0 ? "gray" : +count <= 5 ? "#d78c1b" : "black" }}>
						<td className="controllers">
							<i className="fa fa-trash-alt" onClick={() => handleDelete(_id)} />
							<i className="fa fa-edit" onClick={() => handleEdit({ _id, name, count, weight, price, silverType, customePrice, catagory, gem, description })} />
						</td>
						<td>{count || "لا يوجد"}</td>
						<td>{name}</td>
						<td>{weight}</td>
						<td>{customePrice?.price || price}</td>
						<td>{Math.ceil((+customePrice?.price || +price) * +weight)}</td>
						<td>{customePrice?.silverType || silverType}</td>
						<td>{catagory}</td>
						<td>{gem}</td>
						<td>{description || "لا يوجد"}</td>
					</tr>
				))}
			</Table>
		</div>
	);
};
