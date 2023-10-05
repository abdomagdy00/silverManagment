import { formState, catagoryOptions } from "@/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectBox, FileInput } from "@/components";
import { Alert } from "@/layout";
import { useAxios } from "@/hooks/useAxios";
import { profile } from "@/assets";
import "./styles/product.scss";

export const AddProduct = () => {
	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const { data: options, error: optionsError } = useAxios("get", "/statics/get-data?silverTypes=1&gems=1");
	const [formData, setFormData] = useState(formState);
	const [total, setTotal] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const price = formData.price;
		const weight = formData.weight;
		setTotal(() => +price * +weight || "");
	}, [formData]);

	const handleChange = ({ target: { id, name, value } }) => {
		if (name === "silverType") {
			const silverType = options.silverTypes.find((silverType) => silverType?.name === value);
			setFormData((f) => ({ ...f, silverType: silverType?.name || "", price: silverType?.price || "" }));
			return;
		}

		if (name === "file") {
			if (value.includes("http")) setFormData((f) => ({ ...f, img: value }));
			else if (formData.img?.startsWith("data:image/jpeg;base64")) setFormData((f) => ({ ...f, img: formData.img }));
			else setFormData((f) => ({ ...f, img: profile }));
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
			{optionsError && <Alert message={optionsError} error />}
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

				<div className="flex-between">
					<div className="w-full">
						<label className="field-label">نوع الفضه:</label>
						<SelectBox label="نوع الفضه..." name="silverType" disabled={loading} value={formData.silverType} onChange={handleChange} options={options?.silverTypes} required />
					</div>
					<div className="w-full">
						<label className="field-label">سعر الجرام:</label>
						<input type="text" value={formData.price} placeholder="سعر الجرام..." disabled />
					</div>
				</div>

				<div className="">
					<label className="field-label">السعر الاجمالي:</label>
					<input type="text" value={total} placeholder="السعر الاجمالي" disabled />
				</div>

				<div className="flex-between">
					<div className="w-full">
						<label className="field-label">اسم القسم:</label>
						<SelectBox label="اسم القسم..." name="catagory" disabled={loading} value={formData.catagory} onChange={handleChange} options={catagoryOptions} required />
					</div>
					<div className="w-full">
						<label className="field-label">نوع الحجر:</label>
						<SelectBox label="نوع الحجر..." name="gem" disabled={loading} value={formData.gem} onChange={handleChange} options={options?.gems} required />
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
