import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formState } from "@/constants";
import { useAxios } from "@/hooks/useAxios";
import { Alert } from "@/layout";
import "./styles/product.scss";

export const GetProduct = () => {
	const { error, refetch } = useAxios();
	const [formData, setFormData] = useState(formState);
	const [total, setTotal] = useState("السعر الاجمالي");
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const { data, loading, error } = await refetch("post", `/products/get-product`, { _id: id });
			if (!loading && !error && data?.name) setFormData(() => data);
		})();
	}, [id]);

	useEffect(() => {
		if (formData.silverType === "اخري") {
			const price = formData.customePrice.price;
			const weight = formData.weight;
			setTotal(() => +price * +weight);
		} else {
			const price = formData.price;
			const weight = formData.weight;
			setTotal(() => +price * +weight);
		}
	}, [formData]);

	return (
		<div className="get-product">
			<h1 className="title">عرض المنتج</h1>
			{error && <Alert message={error} error />}

			<div className="wrapper">
				<div className="file">
					<img src={formData.img} alt="file" />
				</div>

				<div className="">
					<label htmlFor="">اسم المنتج:</label>
					<div className="field">{formData.name}</div>
				</div>

				<div className="">
					<label htmlFor="">عدد القطع:</label>
					<div className="field">{formData.count}</div>
				</div>

				<div className="">
					<label htmlFor="">وزن المنتج:</label>
					<div className="field">{formData.weight}</div>
				</div>

				<div className="flex-between">
					<div className="w-full">
						<label htmlFor="">نوع الفضه:</label>
						<div className="field">{formData?.silverType === "اخري" ? formData?.customePrice?.silverType : formData?.silverType}</div>
					</div>
					<div className="w-full">
						<label htmlFor="">سعر الجرام:</label>
						<div className="field">{formData?.price === "none" ? formData?.customePrice?.price : formData?.price}</div>
					</div>
				</div>

				<div className="">
					<label htmlFor="">السعر الاجمالي:</label>
					<div className="field">{total}</div>
				</div>

				<div className="flex-between">
					<div className="w-full">
						<label htmlFor="">اسم القسم:</label>
						<div className="field">{formData.catagory}</div>
					</div>
					<div className="w-full">
						<label htmlFor="">نوع الحجر:</label>
						<div className="field">{formData.gem}</div>
					</div>
				</div>

				<div className="">
					<label htmlFor="">التفاصيل:</label>
					<div className="field">{formData.description}</div>
				</div>
			</div>
		</div>
	);
};
