import "./styles/select.scss";

export const SelectBox = ({ name, label, options, onChange, ...rest }) => {
	return (
		<select className="selectbox" name={name} onChange={onChange} {...rest}>
			<option value="">{label || "اختر..."}</option>
			{options?.map(({ id, name }, i) => (
				<option className="option" data-id={id} value={name} key={i}>
					{name}
				</option>
			))}
		</select>
	);
};
