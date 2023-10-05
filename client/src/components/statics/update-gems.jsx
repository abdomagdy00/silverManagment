import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Error, Loading } from "@/layout";
import { Table } from "@/components";
import "./styles/statics.scss";

const formState = { type: "", id: "", perv: "", name: "", state: false };
export const UpdateGems = () => {
	const [formData, setFormData] = useState(formState);
	const { data: gems, isSubmitted, error: dError, refetch: dRefetch } = useAxios();
	const { data: updateData, error: uError, refetch: uRefetch } = useAxios();

	useEffect(() => {
		(async () => await dRefetch("get", "/statics/get-data?gems=1"))();
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
			const { prev, name } = formData;
			await uRefetch("put", `/statics/update-gem/${formData.id}`, { prev, name });
			setFormData(() => formState);
		}

		if (formData.type === "create") {
			const { name } = formData;
			await uRefetch("post", `/statics/add-gem`, { name });
			setFormData(() => formState);
		}
	};

	const tableOptions = {
		tableTitle: (
			<button className="btn add-btn" onClick={() => setFormData({ ...formState, type: "create", state: true })}>
				أضافة حجر
			</button>
		),
		headers: ["التحكم", "نوع الحجر"],
	};

	if (!isSubmitted) return <Loading />;
	if (dError) return <Error />;

	return (
		<div className="silverTypes-section">
			{dError && <Alert message={dError} error />}
			{uError && <Alert message={uError} error />}
			{updateData?.success && <Alert message={updateData?.success} success />}

			<div className={`overlay ${formData.state ? "" : "hidden"}`} onClick={closeWidget} />

			<div className="title">نوع الحجر</div>

			<Table {...tableOptions}>
				{gems?.map(({ id, name }, i) => (
					<tr key={id} style={i % 2 ? {} : { background: "rgba(147, 14, 132, 0.1)", fontWeight: 600 }}>
						<td className="controllers" style={{ width: 16 }}>
							<i className="fa fa-edit" onClick={() => setFormData({ type: "update", id, prev: name, name, state: true })} />
						</td>
						<td>{name}</td>
					</tr>
				))}
			</Table>

			<form className={`update-widget ${formData.state ? "" : "hidden"}`} onSubmit={handleSubmit}>
				<i className="fa fa-times" onClick={closeWidget} />
				<h3 className="title">{formData.type === "update" ? "تعديل" : "اضافه"}</h3>
				<div className="">
					<label className="field-label">نوع الحجر:</label>
					<input type="text" name="name" value={formData.name} placeholder="اسم النوع" onChange={handleChange} required />
				</div>
				<button type="submit" className="btn w-full">
					{formData.type === "update" ? "تعديل" : "اضافه"}
				</button>
			</form>
		</div>
	);
};
