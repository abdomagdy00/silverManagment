import { silverTypeOptions, pricesOptions, catagoryOptions, gemOptions } from "@/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectBox } from "@/components";
import { Alert } from "@/layout";
import { useAxios } from "@/hooks/useAxios";
import "./styles/product.scss";

export const UpdateProduct = () => {
	const state = useLocation().state;
	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const [formData, setFormData] = useState(state);
	const [total, setTotal] = useState("السعر الاجمالي");
	const [customePrice, setCustomePrice] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (formData.silverType === "اخري") {
			const price = formData.customePrice.price;
			const weight = formData.weight;
			setTotal(() => +price * +weight);
			setCustomePrice(() => true);
		} else {
			const price = formData.price;
			const weight = formData.weight;
			setTotal(() => +price * +weight);
			setCustomePrice(() => false);
		}
	}, [formData]);

	const handleChange = ({ target: { id, name, value } }) => {
		if (name === "silverType") {
			if (value === "اخري") {
				setFormData((f) => ({ ...f, silverType: value }));
				setCustomePrice(() => true);
				return;
			} else if (value) {
				const silverType = silverTypeOptions.find((silverType) => silverType.name === value);
				setFormData((f) => ({ ...f, silverType: value, price: silverType?.price || "", customePrice: { silverType: "", price: "" } }));
				setCustomePrice(() => false);
				return;
			} else {
				setFormData((f) => ({ ...f, silverType: "", price: "" }));
				setCustomePrice(() => false);
				return;
			}
		}

		if (name === "custome") {
			if (id === "silverType") return setFormData((f) => ({ ...f, customePrice: { ...f.customePrice, silverType: value } }));
			if (id === "price") return setFormData((f) => ({ ...f, price: "none", customePrice: { ...f.customePrice, price: value } }));
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { _id, ..._formData } = formData;

		const { data, isSubmitted, error } = await refetch("put", `/products/update-product/${_id}`, _formData);
		if (data?.success && isSubmitted && !error) setTimeout(() => navigate("/products"), 2000);
	};

	return (
		<form className="update-product" onSubmit={handleSubmit}>
			<h1 className="title">تعديل المنتج</h1>
			{isSubmitted && error && <Alert message={error} error />}
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

				{customePrice ? (
					<div className="">
						<div className="">
							<label htmlFor="">نوع الفضه:</label>
							<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						</div>
						<div className="flex-between">
							<div className="">
								<label htmlFor="">نوع الفضه الاخر:</label>
								<input type="text" name="custome" id="silverType" disabled={loading} value={formData.customePrice.silverType} placeholder="نوع الفضه..." onChange={handleChange} required />
							</div>
							<div className="">
								<label htmlFor="">سعر الجرام:</label>
								<input type="number" name="custome" id="price" disabled={loading} value={formData.customePrice.price} placeholder="سعر المنتج..." onChange={handleChange} required />
							</div>
						</div>
					</div>
				) : (
					<div className="flex-between">
						<div className="">
							<label htmlFor="">نوع الفضه:</label>
							<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						</div>
						<div className="">
							<label htmlFor="">سعر الجرام:</label>
							<SelectBox label="سعر المنتج..." name="price" value={formData.price} onChange={handleChange} options={pricesOptions} disabled />
						</div>
					</div>
				)}

				<div className="">
					<label htmlFor="">الاجمالي</label>
					<input type="text" value={total} disabled />
				</div>

				<div className="flex-between">
					<div className="">
						<label htmlFor="">اسم القسم</label>
						<SelectBox label="اسم القسم..." name="catagory" disabled={loading} value={formData.catagory} onChange={handleChange} options={catagoryOptions} required />
					</div>
					<div className="">
						<label htmlFor="">نوع الحجر</label>
						<SelectBox label="نوع الحجر..." name="gem" disabled={loading} value={formData.gem} onChange={handleChange} options={gemOptions} required />
					</div>
				</div>

				<div className="">
					<label htmlFor="">التفاصيل</label>
					<input type="text" name="description" disabled={loading} value={formData.description} placeholder="التفاصيل (اختياري)..." onChange={handleChange} />
				</div>

				<button type="submit" className="btn submit-btn">
					تعديل
				</button>
			</div>
		</form>
	);
};
