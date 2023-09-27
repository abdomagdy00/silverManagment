import { formState, silverTypeOptions, pricesOptions, catagoryOptions, gemOptions } from "@/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectBox, FileInput } from "@/components";
import { Alert } from "@/layout";
import { useAxios } from "@/hooks/useAxios";
import { user } from "@/assets";
import "./styles/add-product.scss";

export const AddProduct = () => {
	const { data, error, isSubmitted, refetch } = useAxios();
	const [formData, setFormData] = useState(formState);
	const [total, setTotal] = useState("السعر الاجمالي");
	const [customePrice, setCustomePrice] = useState(false);
	const navigate = useNavigate();

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
				setFormData((f) => ({ ...f, price: "" }));
				setCustomePrice(() => false);
				return;
			}
		}

		if (name === "custome") {
			if (id === "silverType") return setFormData((f) => ({ ...f, customePrice: { ...f.customePrice, silverType: value } }));
			if (id === "price") return setFormData((f) => ({ ...f, price: "none", customePrice: { ...f.customePrice, price: value } }));
		}

		if (name === "file") {
			if (value.includes("http")) {
				setFormData((f) => ({ ...f, img: value }));
			} else if (formData.img?.startsWith("data:image/jpeg;base64")) {
				setFormData((f) => ({ ...f, img: formData.img }));
			} else {
				setFormData((f) => ({ ...f, img: user }));
			}
			return;
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { isSubmitted, error } = await refetch("post", "/products/create-product", formData);
		if (isSubmitted && !error) setTimeout(() => navigate("/"), 2000);
	};

	return (
		<form className="add-product" onSubmit={handleSubmit}>
			<h1 className="title">اضافه منتج جديد</h1>
			{isSubmitted && error && <Alert message={error} error />}
			{isSubmitted && !error && data?.success && <Alert message={data.success} success />}

			<div className="wrapper">
				<div className="file">
					<label htmlFor="image">
						<img src={formData.img} alt="file" />
					</label>
					<FileInput setFormData={setFormData} name="file" id="image" />
				</div>

				<input type="url" name="file" placeholder="رايط الصورة (اختباري)..." onChange={handleChange} />

				<input type="text" name="name" placeholder="اسم المنتج..." value={formData.name} onChange={handleChange} required />

				<input type="number" name="weight" placeholder="وزن المنتج..." value={formData.weight} onChange={handleChange} required />

				{customePrice ? (
					<div className="">
						<SelectBox label="نوع الفضه..." name="silverType" value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						<div className="flex-between">
							<input type="text" name="custome" id="silverType" value={formData.customePrice.silverType} placeholder="نوع الفضه..." onChange={handleChange} required />
							<input type="number" name="custome" id="price" value={formData.customePrice.price} placeholder="سعر المنتج..." onChange={handleChange} required />
						</div>
					</div>
				) : (
					<div className="flex-between">
						<SelectBox label="نوع الفضه..." name="silverType" value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						<SelectBox label="سعر المنتج..." name="price" value={formData.price} onChange={handleChange} options={pricesOptions} disabled />
					</div>
				)}

				<input type="text" value={total} disabled />

				<div className="flex-between">
					<SelectBox label="اسم القسم..." name="catagory" value={formData.catagory} onChange={handleChange} options={catagoryOptions} required />
					<SelectBox label="نوع الحجر..." name="gem" value={formData.gem} onChange={handleChange} options={gemOptions} required />
				</div>

				<button type="submit" className="btn submit-btn">
					اضافه
				</button>
			</div>
		</form>
	);
};
