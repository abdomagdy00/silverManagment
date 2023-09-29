import "./styles/table.scss";

export const Table = ({ tableTitle, headers, prices, children, footer }) => {
	const cols = headers.length;

	return (
		<table className="table">
			<thead className="table-head">
				<tr className="head-title text-primary">
					<th colSpan={cols}>{tableTitle}</th>
				</tr>
				<tr style={{ background: "rgba(147, 14, 132, 0.5)" }}>
					{headers.map((name) => (
						<th key={name}>{name}</th>
					))}
				</tr>
			</thead>

			<tbody className="table-body">{children}</tbody>

			<tfoot className="table-foot">
				<tr className="head-title" style={{ background: "rgba(147, 14, 132, 0.5)" }}>
					{footer?.map((name) => (
						<th colSpan={cols / footer.length} key={name}>
							{name}
						</th>
					))}
				</tr>
				<tr className="head-title">
					{prices.map((price, i) => (
						<td key={i} colSpan={cols / footer.length} style={{ background: "rgba(147, 14, 132, 0.1)" }}>
							{price?.toLocaleString()}
						</td>
					))}
				</tr>
			</tfoot>
		</table>
	);
};
