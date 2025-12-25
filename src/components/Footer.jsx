import React from 'react'


export default function Footer() {
return (
<footer className="bg-white mt-12 border-t">
<div className="container py-6 flex items-center justify-between">
<div>
<div className="font-semibold">Frozen Food Co.</div>
<div className="text-sm text-gray-500">Made with care • Shelf-stable quality</div>
</div>
<div className="flex items-center gap-3 text-sm">
<a href="#" aria-label="facebook">Facebook</a>
<a href="#" aria-label="instagram">Instagram</a>
<a href="#" aria-label="twitter">X</a>
</div>
</div>
</footer>
)
}