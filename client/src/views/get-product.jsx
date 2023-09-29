import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formState } from "@/constants";
import { useAxios } from "@/hooks/useAxios";
import { Alert } from "@/layout";
import "./styles/product.scss";

export const GetProduct = () => {
	const { error: getError, refetch: getRefetch } = useAxios();
	const { data: saleData, isSubmitted: saleIsSubmitted, error: saleError, refetch: saleRefetch } = useAxios();
	const [formData, setFormData] = useState(formState);
	const [total, setTotal] = useState("السعر الاجمالي");
	const [openWidget, setOpenWidget] = useState(false);
	const [saleCount, setSaleCount] = useState(0);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const { data, loading, error } = await getRefetch("get", `/products/get-product/${id}`);
			if (!loading && !error && data?.name) setFormData(() => data);
		})();
	}, [id, saleData]);

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

	const handleSales = async () => {
		const { img, count: fCount, description, ...form } = formData;

		if (!saleCount) return;
		const count = fCount - saleCount;

		if (count < 0) return alert("لا يتوفر هذا العدد");
		const { loading, error } = await saleRefetch("put", `/products/update-product/${id}`, { ...form, count });

		if (!loading && !error) {
			setOpenWidget(false);
			setTimeout(() => navigate("/"), 2000);
		}
	};

	return (
		<div className="get-product">
			<h1 className="title">عرض المنتج</h1>
			{(getError || saleError) && <Alert message={getError || saleError} error />}
			{saleIsSubmitted && !saleError && <Alert message={saleData?.success} success />}

			<div className="wrapper">
				<div className="file">
					<img src={formData.img} alt="file" />
				</div>

				<div className="controllers">
					<button type="button" className="edit-btn" onClick={() => navigate(`/products/update-product`, { state: formData })}>
						تعديل
					</button>
					<button type="button" className="sale-btn" onClick={() => setOpenWidget(true)}>
						بيع
					</button>
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
					<div className="field">{formData.description || "لا يوجد"}</div>
				</div>
			</div>

			<div className={`sale-product ${openWidget ? "" : "hidden"}`}>
				<i className="fa fa-times" onClick={() => setOpenWidget(false)} />
				<h3 className="sale-title">العدد المراد بيعه</h3>
				<input type="number" value={saleCount} placeholder="العدد المراد بيعه" onChange={(e) => setSaleCount(() => e.target.value)} />
				<button className="btn w-full" onClick={handleSales}>
					بيع
				</button>
			</div>
			<div className={`overlay ${openWidget ? "" : "hidden"}`} onClick={() => setOpenWidget(false)} />
		</div>
	);
};
