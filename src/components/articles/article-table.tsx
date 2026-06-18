export function ArticleTable({
	headers,
	rows,
}: {
	headers: string[];
	rows: string[][];
}) {
	return (
		<div className="my-8 overflow-x-auto">
			<table className="w-full min-w-2xl border-collapse text-start text-sm">
				<thead>
					<tr className="bg-brand-light">
						{headers.map((h) => (
							<th
								key={h}
								className="border-card-border border-b px-4 py-3 text-start font-semibold text-foreground"
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i} className="border-card-border border-b">
							{row.map((cell, j) => (
								<td key={j} className="text-article-muted px-4 py-3 text-start">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
