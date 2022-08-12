module.exports = {
	"bracketSameLine": false,
	"printWidth": 80,
	"semi": true,
	"singleQuote": true,
	"tabWidth": 2,
	"trailingComma": "all",
	"useTabs": true,
	"plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
	"importOrder": [
		"^cli-actions/(.*)$",
		"^modifiers/(.*)$",
		"^utils/(.*)$",
		"^types/(.*)$",
		"^[./]",
	],
	"importOrderSeparation": false,
	"importOrderSortSpecifiers": true,
	"importOrderCaseInsensitive": true
}
