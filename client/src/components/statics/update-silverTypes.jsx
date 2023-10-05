import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Error, Loading } from "@/layout";
import { Table } from "@/components";
import "./styles/statics.scss";

const formState = { type: "", id: "", prev: "", name: "", price: "", state: false };
export const UpdateSilverTypes = () => {
	const [formData, setFormData] = useState(formState);
	const { data: silverTypes, loading: dLoading, isSubmitted, error: dError, refetch: dRefetch } = useAxios();
	const { data: updateData, error: uError, refetch: uRefetch } = useAxios();

	useEffect(() => {
		(async () => await dRefetch("get", "/statics/get-data?silverTypes=1"))();
	}, [updateData]);

	const closeWidget = () => {
		setFormData((f) => ({ ...f, state: false }));
	};

	const handleChange = ({ target: { name, value } }) => {
		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (formData.type === "update") {
			const { prev, name, price } = formData;
			await uRefetch("put", `/statics/update-silverType/${formData.id}`, { prev, name, price });
			setFormData(() => formState);
		}

		if (formData.type === "create") {
			const { name, price } = formData;
			await uRefetch("post", `/statics/add-silverType`, { name, price });
			setFormData(() => formState);
		}
	};

	const tableOptions = {
		tableTitle: (
			<button className="btn add-btn" onClick={() => setFormData({ ...formState, type: "create", state: true })}>
				أضافة نوع
			</button>
		),
		headers: ["التحكم", "نوع الفضه", "سعر الجرام"],
	};

	if (!isSubmitted) return <Loading />;
	if (dError) return <Error />;

	return (
		<div className="silverTypes-section">
			{dError && <Alert message={dError} error />}
			{uError && <Alert message={uError} error />}
			{updateData?.success && <Alert message={updateData?.success} success />}

			<div className={`overlay ${formData.state ? "" : "hidden"}`} onClick={closeWidget} />

			<div className="title">نوع الفضه</div>

			<Table {...tableOptions}>
				{silverTypes?.map(({ _id, name, price }, i) => (
					<tr key={i} style={i % 2 ? {} : { background: "rgba(147, 14, 132, 0.1)", fontWeight: 600 }}>
						<td className="controllers" style={{ width: 16 }}>
							<i className="fa fa-edit" onClick={() => setFormData({ name, price, type: "update", id: _id, prev: name, state: true })} />
						</td>
						<td>{name}</td>
						<td>{price}</td>
					</tr>
				))}
			</Table>

			<form className={`update-widget ${formData.state ? "" : "hidden"}`} onSubmit={handleSubmit}>
				<i className="fa fa-times" onClick={closeWidget} />
				<h3 className="title">{formData.type === "update" ? "تعديل" : "اضافه"}</h3>
				<div className="">
					<label className="field-label">نوع الفضه:</label>
					<input type="text" name="name" value={formData.name} placeholder="اسم النوع" onChange={handleChange} required disabled={dLoading} />
				</div>
				<div className="">
					<label className="field-label">سعر الجرام:</label>
					<input type="number" name="price" value={formData.price} placeholder="سعر الجرام" onChange={handleChange} required disabled={dLoading} />
				</div>
				<button type="submit" className="btn w-full">
					{formData.type === "update" ? "تعديل" : "اضافه"}
				</button>
			</form>
		</div>
	);
};
