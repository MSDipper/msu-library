import "../06_shared/ui/checkbox/checkbox.scss"

export const createCheckbox = ({ checked = false}) => {
    const check = checked ? "checked" : "";


return  `<div><input type="checkbox" class="checkbox" ${check}><label assets
<svg class="checkbox" width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M19 5L8.6875 16L4 11" stroke="url(#paint0_linear_176_9088)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_176_9088" x1="-0.107883" y1="-5.43103" x2="9.07562" y2="19.6359" gradientUnits="userSpaceOnUse">
<stop stop-color="#43CBFF"/>
<stop offset="1" stop-color="#9708CC"/>
</linearGradient>
</defs>
</svg>`
}