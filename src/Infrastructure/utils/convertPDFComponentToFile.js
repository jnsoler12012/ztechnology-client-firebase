import { Document, pdf } from '@react-pdf/renderer';
import React from 'react';

export default async function (Element) {
    const file2 = <Document title="PDF FILE"> </Document>

    const blob = await pdf(Element).toBlob()

    new HTML

    var file = new File([blob], "pdfname.pdf", { lastModified: (new Date()).getTime() });

    return file
}