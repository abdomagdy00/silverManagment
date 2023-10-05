import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { SelectBox } from "@/components";
import { Alert } from "@/layout";
import { catagoryOptions } from "@/constants";
import "./styles/product.scss";

export const UpdateProduct = () => {
	const state = useLocation().state;
	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const { data: options, error: optionsError } = useAxios("get", "/statics/get-data?silverTypes=1&gems=1");
	const [formData, setFormData] = useState(state);
	const [total, setTotal] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const price = formData.price;
		const weight = formData.weight;
		setTotal(() => +price * +weight);
	}, [formData]);

	const handleChange = ({ target: { name, value } }) => {
		if (name === "silverType") {
			const silverType = options?.silverTypes.find((silverType) => silverType.name === value);
			setFormData((f) => ({ ...f, silverType: silverType?.name || "", price: silverType?.price || "" }));
			return;
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { _id, ..._formData } = formData;

		const { data, isSubmitted, error } = await refetch("put", `/products/update-product/${_id}`, _formData);
		if (data?.success && isSubmitted && !error) setTimeout(() => navigate("/"), 2000);
	};

	return (
		<form className="update-product" onSubmit={handleSubmit}>
			<h1 className="title">تعديل المنتج</h1>
			{isSubmitted && error && <Alert message={error} error />}
			{optionsError && <Alert message={optionsError} error />}
			{isSubmitted && !error && data?.success && <Alert message={data.success} success />}

			<div className="wrapper">
				<div className="">
					<label htmlFor="">الاسم:</label>
					<input type="text" name="name" disabled={loading} placeholder="اسم المنتج..." value={formData.name} onChange={handleChange} required />
				</div>

				<div className="">
					<label htmlFor="">الوزن:</label>
					<input type="number" name="weight" disabled={loading} placeholder="وزن المنتج..." value={formData.weight} onChange={handleChange} required />
				</div>

				<div className="">
					<label htmlFor="">عدد القطع:</label>
					<input type="number" name="count" disabled={loading} placeholder="عدد القطع..." value={formData.count} onChange={handleChange} required />
				</div>

				<div className="flex-between">
					<div className="w-full">
						<label htmlFor="">نوع الفضه:</label>
						<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={options?.silverTypes} required />
					</div>
					<div className="w-full">
						<label htmlFor="">سعر الجرام:</label>
						<input type="text" value={formData.price} placeholder="سعر الجرام..." disabled />
					</div>
				</div>

				<div className="">
					<label htmlFor="">السعر الاجمالي:</label>
					<input type="text" value={total} placeholder="السعر الاجمالي" disabled />
				</div>

				<div className="flex-between">
					<div className="w-full">
						<label htmlFor="">اسم القسم:</label>
						<SelectBox label="اسم القسم..." name="catagory" disabled={loading} value={formData.catagory} onChange={handleChange} options={catagoryOptions} required />
					</div>
					<div className="w-full">
						<label htmlFor="">نوع الحجر:</label>
						<SelectBox label="نوع الحجر..." name="gem" disabled={loading} value={formData.gem} onChange={handleChange} options={options?.gems} required />
					</div>
				</div>

				<div className="">
					<label htmlFor="">التفاصيل:</label>
					<input type="text" name="description" disabled={loading} value={formData.description} placeholder="التفاصيل (اختياري)..." onChange={handleChange} />
				</div>

				<button type="submit" className="btn submit-btn">
					تعديل
				</button>
			</div>
		</form>
	);
};
