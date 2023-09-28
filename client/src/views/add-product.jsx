import { formState, silverTypeOptions, pricesOptions, catagoryOptions, gemOptions } from "@/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectBox, FileInput } from "@/components";
import { Alert } from "@/layout";
import { useAxios } from "@/hooks/useAxios";
import { user } from "@/assets";
import "./styles/product.scss";

export const AddProduct = () => {
	const { data, loading, error, isSubmitted, refetch } = useAxios();
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
				setFormData((f) => ({ ...f, silverType: "", price: "" }));
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
					<FileInput setFormData={setFormData} name="file" disabled={loading} id="image" />
				</div>

				<div className="">
					<label className="field-label">رابط الصورة (اختياري):</label>
					<input type="url" name="file" disabled={loading} placeholder="رايط الصورة (اختباري)..." onChange={handleChange} />
				</div>

				<div className="">
					<label className="field-label">اسم المنتج:</label>
					<input type="text" name="name" disabled={loading} placeholder="اسم المنتج..." value={formData.name} onChange={handleChange} required />
				</div>

				<div className="">
					<label className="field-label">وزن المنتج:</label>
					<input type="number" name="weight" disabled={loading} placeholder="وزن المنتج..." value={formData.weight} onChange={handleChange} required />
				</div>

				<div className="">
					<label className="field-label">عدد القطع:</label>
					<input type="number" name="count" disabled={loading} placeholder="عدد القطع..." value={formData.count} onChange={handleChange} required />
				</div>

				{customePrice ? (
					<div className="">
						<div className="">
							<label className="field-label">نوع الفضه:</label>
							<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						</div>
						<div className="flex-between">
							<div className="">
								<label className="field-label">نوع الفضه الاخر:</label>
								<input type="text" name="custome" id="silverType" disabled={loading} value={formData.customePrice.silverType} placeholder="نوع الفضه..." onChange={handleChange} required />
							</div>
							<div className="">
								<label className="field-label">سعر الجرام:</label>
								<input type="number" name="custome" id="price" disabled={loading} value={formData.customePrice.price} placeholder="سعر الجرام..." onChange={handleChange} required />
							</div>
						</div>
					</div>
				) : (
					<div className="flex-between">
						<div className="">
							<label className="field-label">نوع الفضه:</label>
							<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={silverTypeOptions} required />
						</div>
						<div className="">
							<label className="field-label">سعر الجرام:</label>
							<SelectBox label="سعر الجرام..." name="price" value={formData.price} onChange={handleChange} options={pricesOptions} disabled />
						</div>
					</div>
				)}

				<div className="">
					<label className="field-label">السعر الاجمالي:</label>
					<input type="text" value={total} disabled />
				</div>

				<div className="flex-between">
					<div className="">
						<label className="field-label">اسم القسم:</label>
						<SelectBox label="اسم القسم..." name="catagory" disabled={loading} value={formData.catagory} onChange={handleChange} options={catagoryOptions} required />
					</div>
					<div className="">
						<label className="field-label">نوع الحجر:</label>
						<SelectBox label="نوع الحجر..." name="gem" disabled={loading} value={formData.gem} onChange={handleChange} options={gemOptions} required />
					</div>
				</div>

				<div className="">
					<label className="field-label">التفاصيل (اختياري):</label>
					<input type="text" name="description" disabled={loading} value={formData.description} placeholder="التفاصيل (اختياري)..." onChange={handleChange} />
				</div>

				<button type="submit" className="btn submit-btn">
					اضافه
				</button>
			</div>
		</form>
	);
};
