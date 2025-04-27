import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface InvoiceItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

const InvoiceGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    name: 'ArrayIndex',
    address: '3191 Sorrento Crescent, Burlington, ON L7M 0N2, Canada',
    email: 'contact@arrayindex.com',
    phone: '+1 (555) 123-4567',
  });
  
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    taxRate: 13, // HST rate for Ontario
  });
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Web Development Services', hours: 10, rate: 120 },
  ]);
  
  const [notes, setNotes] = useState('Payment is due within 30 days of receipt.');
  
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + (item.hours * item.rate), 0);
  
  // Calculate tax amount
  const taxAmount = subtotal * (invoiceDetails.taxRate / 100);
  
  // Calculate total
  const total = subtotal + taxAmount;
  
  // Handle adding a new item
  const addItem = () => {
    const newId = String(items.length + 1);
    setItems([...items, { id: newId, description: '', hours: 0, rate: 120 }]);
  };
  
  // Handle removing an item
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Handle item changes
  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  // Handle company info changes
  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: value,
    });
  };
  
  // Handle client info changes
  const handleClientInfoChange = (field: string, value: string) => {
    setClientInfo({
      ...clientInfo,
      [field]: value,
    });
  };
  
  // Handle invoice details changes
  const handleInvoiceDetailsChange = (field: string, value: string | number) => {
    setInvoiceDetails({
      ...invoiceDetails,
      [field]: value,
    });
  };
  
  // Generate a simple CSV download instead of PDF
  const generateCSV = () => {
    try {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Add header information
      csvContent += `ArrayIndex Invoice,#${invoiceDetails.invoiceNumber}\n`;
      csvContent += `Date: ${new Date(invoiceDetails.invoiceDate).toLocaleDateString()},Due: ${new Date(invoiceDetails.dueDate).toLocaleDateString()}\n`;
      csvContent += `\n`;
      
      // Company info
      csvContent += `From:,${companyInfo.name}\n`;
      csvContent += `Address:,${companyInfo.address.replace(/\n/g, ', ')}\n`;
      csvContent += `Email:,${companyInfo.email}\n`;
      csvContent += `Phone:,${companyInfo.phone}\n`;
      csvContent += `\n`;
      
      // Client info
      csvContent += `Bill To:,${clientInfo.name}\n`;
      if (clientInfo.address) {
        csvContent += `Address:,${clientInfo.address.replace(/\n/g, ', ')}\n`;
      }
      csvContent += `Email:,${clientInfo.email}\n`;
      csvContent += `\n`;
      
      // Invoice items header
      csvContent += `Description,Hours,Rate,Amount\n`;
      
      // Invoice items
      items.forEach(item => {
        csvContent += `${item.description},${item.hours},$${item.rate.toFixed(2)},$${(item.hours * item.rate).toFixed(2)}\n`;
      });
      
      // Totals
      csvContent += `\n`;
      csvContent += `Subtotal,,$${subtotal.toFixed(2)}\n`;
      csvContent += `HST (${invoiceDetails.taxRate}%),,,$${taxAmount.toFixed(2)}\n`;
      csvContent += `Total,,,$${total.toFixed(2)}\n`;
      csvContent += `\n`;
      
      // Notes
      if (notes) {
        csvContent += `Notes:,${notes.replace(/\n/g, ' ')}\n`;
      }
      
      // Create the download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Invoice-${invoiceDetails.invoiceNumber}.csv`);
      document.body.appendChild(link); // Required for Firefox
      
      // Trigger download and clean up
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('There was an error generating the invoice file. Please try again.');
    }
  };
  
  // Alternative download as HTML
  const generateHTML = () => {
    try {
      // Create HTML content
      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice-${invoiceDetails.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .company-name { font-size: 24px; color: #2563eb; font-weight: bold; }
            .invoice-title { font-size: 18px; text-align: right; }
            .columns { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .column { width: 48%; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #2563eb; color: white; text-align: left; padding: 10px; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            .text-right { text-align: right; }
            .total-row { font-weight: bold; }
            .notes { margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 5px; }
            .footer { margin-top: 50px; text-align: center; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div>
              <div class="company-name">${companyInfo.name}</div>
              <div>${companyInfo.address.replace(/\n/g, '<br>')}</div>
              <div>${companyInfo.email}</div>
              <div>${companyInfo.phone}</div>
            </div>
            <div class="invoice-title">
              <h2>INVOICE #${invoiceDetails.invoiceNumber}</h2>
              <div>Date: ${new Date(invoiceDetails.invoiceDate).toLocaleDateString()}</div>
              <div>Due: ${new Date(invoiceDetails.dueDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h3>Bill To:</h3>
              <div><strong>${clientInfo.name}</strong></div>
              ${clientInfo.address ? `<div>${clientInfo.address.replace(/\n/g, '<br>')}</div>` : ''}
              <div>${clientInfo.email}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Hours</th>
                <th>Rate</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.hours}</td>
                  <td>$${item.rate.toFixed(2)}</td>
                  <td class="text-right">$${(item.hours * item.rate).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="width: 40%; margin-left: auto;">
            <table>
              <tr>
                <td>Subtotal:</td>
                <td class="text-right">$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>HST (${invoiceDetails.taxRate}%):</td>
                <td class="text-right">$${taxAmount.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Total:</td>
                <td class="text-right">$${total.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          ${notes ? `
            <div class="notes">
              <h3>Notes:</h3>
              <p>${notes.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}

          <div class="footer">
            <p>Thank you for your business!</p>
          </div>

        </body>
        </html>
      `;

      // Create the download link
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${invoiceDetails.invoiceNumber}.html`;
      document.body.appendChild(link);
      
      // Trigger download and clean up
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating HTML:', error);
      alert('There was an error generating the invoice file. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-blue-500">
            Invoice Generator
          </h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
            >
              Back to Dashboard
            </button>
            <div className="flex space-x-2">
              <button 
                onClick={generateHTML}
                className="px-4 py-2 bg-gradient-to-r from-primary-color to-blue-600 hover:from-primary-color/90 hover:to-blue-700 rounded-lg text-white transition-all"
              >
                Download HTML
              </button>
              <button 
                onClick={generateCSV}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Company Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <textarea
                  value={companyInfo.address}
                  onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  value={companyInfo.phone}
                  onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Client Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(e) => handleClientInfoChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  placeholder="Client or Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <textarea
                  value={clientInfo.address}
                  onChange={(e) => handleClientInfoChange('address', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  placeholder="Client Address"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) => handleClientInfoChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  placeholder="client@example.com"
                />
              </div>
            </div>
          </div>
          
          {/* Invoice Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceDetails.invoiceNumber}
                  onChange={(e) => handleInvoiceDetailsChange('invoiceNumber', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDetails.invoiceDate}
                  onChange={(e) => handleInvoiceDetailsChange('invoiceDate', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                <input
                  type="date"
                  value={invoiceDetails.dueDate}
                  onChange={(e) => handleInvoiceDetailsChange('dueDate', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">HST Rate (%)</label>
                <input
                  type="number"
                  value={invoiceDetails.taxRate}
                  onChange={(e) => handleInvoiceDetailsChange('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Invoice Items */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Invoice Items</h2>
            <button 
              onClick={addItem}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
            >
              Add Item
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rate ($/hr)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
                        placeholder="Item description"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.hours}
                        onChange={(e) => handleItemChange(item.id, 'hours', parseFloat(e.target.value) || 0)}
                        className="w-20 bg-transparent border-none focus:outline-none focus:ring-0"
                        min="0"
                        step="0.5"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-24 bg-transparent border-none focus:outline-none focus:ring-0"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">${(item.hours * item.rate).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300"
                        disabled={items.length === 1}
                      >
                        {items.length > 1 ? 'Remove' : ''}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Totals and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
              rows={5}
              placeholder="Add notes or payment instructions"
            />
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">HST ({invoiceDetails.taxRate}%):</span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold text-primary-color">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview (hidden from UI, used for printing) */}
        <div className="hidden">
          <div ref={invoiceRef} className="p-10 bg-white text-black max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{companyInfo.name}</h1>
                <p className="text-gray-600 whitespace-pre-line">{companyInfo.address}</p>
                <p className="text-gray-600">{companyInfo.email}</p>
                <p className="text-gray-600">{companyInfo.phone}</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
                <p className="text-gray-600">#{invoiceDetails.invoiceNumber}</p>
                <p className="text-gray-600">Date: {new Date(invoiceDetails.invoiceDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Due: {new Date(invoiceDetails.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Bill To:</h3>
              <p className="font-semibold text-gray-800">{clientInfo.name}</p>
              <p className="text-gray-600 whitespace-pre-line">{clientInfo.address}</p>
              <p className="text-gray-600">{clientInfo.email}</p>
            </div>
            
            <table className="min-w-full mb-10">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Description</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Hours</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">{item.description}</td>
                    <td className="py-4 px-4 text-center text-gray-700">{item.hours}</td>
                    <td className="py-4 px-4 text-center text-gray-700">${item.rate.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right text-gray-700">${(item.hours * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-end mb-10">
              <div className="w-1/3">
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-gray-700">Subtotal:</span>
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-gray-700">HST ({invoiceDetails.taxRate}%):</span>
                  <span className="text-gray-700">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-gray-700">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-semibold text-gray-700 mb-2">Notes:</h3>
              <p className="text-gray-600 whitespace-pre-line">{notes}</p>
            </div>
            
            <div className="text-center mt-16 text-gray-500 text-sm">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
