## Component Definition

The essence of Pagination is to control the amount of information on a single page and enable page navigation.

<code src="./design/behavior-pattern.tsx" inline></code>

## Basic Usage

<code src="./design/demo/basic" description="The most basic pagination control that only displays page numbers." tip="Recommended for lightweight pagination scenarios with less than 10 pages of content.">Few Pages</code>

<code src="./design/demo/large-amount" description="When there is a large amount of data to display, pagination allows users to quickly locate the current page number. Shows first and last page numbers with some page numbers omitted." tip="Recommended for pagination scenarios with more than 10 pages of content.">Large Amount of Pages</code>

## Interactive Variants

<code src="./design/demo/page-size" description="Allows adjustment of the number of items displayed per page according to user needs.">Adjust Items Per Page</code>

<code src="./design/demo/quick-jump" description="When data requires quick positioning, enter a page number to quickly jump to the specified page.">Quick Jump</code>

<code src="./design/demo/total" description="Users can quickly understand the total amount of data without browsing everything. Commonly used for data statistics in tables.">Understanding Total Data</code>

## Style Variants

<code src="./design/demo/simple" description="An extremely simple pagination control that only shows current page, total pages, and previous/next navigation. Suitable for scenarios with limited horizontal space within modules.">Simple Pagination</code>

<code src="./design/demo/mini" description="Small-sized pagination control. Suitable for scenarios with limited space within modules that require lightweight page navigation.">Mini Pagination</code>

<code src="./demo/itemRender" description="Modify previous and next steps to text links.">Previous and Next Steps</code>
