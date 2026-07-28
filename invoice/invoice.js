/**
 * SAH ENTERPRISE - Tax Invoice Generator Engine (invoice.js)
 * Standalone logic for Tax Invoice creation, live preview rendering, and export operations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Application State Object for Tax Invoice
    const state = {
        docType: 'invoice',
        sellerName: 'SAH ENTERPRISE',
        sellerAddr1: 'Holding no. 303, R.K. Roy Road Vivekananda Pally,',
        sellerAddr2: 'Ismile. Asansol- 713301',
        sellerGst: '19FMLPS0625H1ZO',
        sellerPhone: '9832713026/9064441273',
        sellerEmail: 'bhaarat.poles@gmail.com',

        invoiceNo: 'SE-04/26-27',
        invoiceDate: '11/06/2026',
        deliveryNote: '',
        modeOfPayment: 'Online',
        buyerOrderNo: '',
        buyerOrderDate: '',
        dispatchDocNo: '',
        dispatchDocDate: '',
        dispatchThrough: 'Roadways',
        destination: 'Maa Kalyaneshwari Mandir, Maithon.',
        vehicleNo: 'WB 37C 1216',
        termsOfDelivery: '',
        
        buyerName: 'SIRAJUDDIN ANSARI',
        buyerAddress1: 'NA, Gopalpur, Benagorai',
        buyerAddress2: 'Nirsa, Dhanbad',
        buyerStatePin: 'Jharkhand- 828205',
        buyerGst: '20AGQPA2464E1ZX',
        
        taxMode: 'igst18', // igst18 | cgst_sgst9 | exempt | custom
        customTaxRate: 18,
        transportationFee: 0,
        
        items: [
            {
                id: 1,
                sl: 1,
                desc: '5 mtr MS garden pole, single arm.',
                hsn: '7308',
                qtyNum: 10,
                unit: 'pcs',
                rate: 4900
            }
        ],
        
        remark1: '50% for booking and 100% payment before material dispatch.',
        remark2: 'Transportation will be done by us and the fare will be borne by the buyer.',
        
        bankName: 'Punjab National Bank',
        bankAccount: '1397202100001251',
        bankBranchIfsc: 'SB Gorai Road Branch',
        bankIfscCode: 'PUNB0139720',

        showStamp: 'yes',
        sigTitle: 'Authorized Signatory',
        sigDesignation: 'Proprietor'
    };

    // Preset Catalog Database
    const PRESETS = {
        preset_1: {
            desc: '5 mtr MS garden pole, single arm.',
            hsn: '7308',
            qtyNum: 10,
            unit: 'pcs',
            rate: 4900
        },
        preset_2: {
            desc: '3m Designer Garden Light Pole. J-Shaped Double arm with base plate measuring 200x200x8mm. Bottom pipe dia: 4.5inch and 1m long, Top pipe dia: 3inch and 2m long. Thickness 2.5mm.',
            hsn: '7308',
            qtyNum: 6,
            unit: 'pcs',
            rate: 4800
        },
        preset_3: {
            desc: 'M16 Foundation Bolts (Set of 4)',
            hsn: '7318',
            qtyNum: 6,
            unit: 'sets',
            rate: 580
        },
        preset_4: {
            desc: '6m Octagonal Steel Pole with Base Plate (200x200x12mm), Top Dia 70mm, Bottom Dia 130mm, 3mm Thickness.',
            hsn: '7308',
            qtyNum: 10,
            unit: 'pcs',
            rate: 9500
        },
        preset_5: {
            desc: '9m Swaged Tubular Steel Pole (SP-33 Type) with Base Plate measuring 300x300x16mm.',
            hsn: '7308',
            qtyNum: 5,
            unit: 'pcs',
            rate: 12800
        }
    };

    // DOM Elements Cache
    const el = {
        sellerName: document.getElementById('sellerName'),
        sellerAddr1: document.getElementById('sellerAddr1'),
        sellerAddr2: document.getElementById('sellerAddr2'),
        sellerGst: document.getElementById('sellerGst'),
        sellerPhone: document.getElementById('sellerPhone'),
        sellerEmail: document.getElementById('sellerEmail'),

        invoiceNo: document.getElementById('invoiceNo'),
        invoiceDate: document.getElementById('invoiceDate'),
        deliveryNote: document.getElementById('deliveryNote'),
        modeOfPayment: document.getElementById('modeOfPayment'),
        buyerOrderNo: document.getElementById('buyerOrderNo'),
        buyerOrderDate: document.getElementById('buyerOrderDate'),
        dispatchDocNo: document.getElementById('dispatchDocNo'),
        dispatchDocDate: document.getElementById('dispatchDocDate'),
        dispatchThrough: document.getElementById('dispatchThrough'),
        destination: document.getElementById('destination'),
        vehicleNo: document.getElementById('vehicleNo'),
        termsOfDelivery: document.getElementById('termsOfDelivery'),
        
        buyerName: document.getElementById('buyerName'),
        buyerAddress1: document.getElementById('buyerAddress1'),
        buyerAddress2: document.getElementById('buyerAddress2'),
        buyerStatePin: document.getElementById('buyerStatePin'),
        buyerGst: document.getElementById('buyerGst'),
        
        itemsContainer: document.getElementById('itemsContainer'),
        btnAddItem: document.getElementById('btnAddItem'),
        presetSelect: document.getElementById('presetSelect'),
        btnAddPreset: document.getElementById('btnAddPreset'),
        
        taxMode: document.getElementById('taxMode'),
        customTaxRow: document.getElementById('customTaxRow'),
        customTaxRate: document.getElementById('customTaxRate'),
        transportationFee: document.getElementById('transportationFee'),

        selectShowStamp: document.getElementById('selectShowStamp'),
        sigTitle: document.getElementById('sigTitle'),
        sigDesignation: document.getElementById('sigDesignation'),
        
        remark1: document.getElementById('remark1'),
        remark2: document.getElementById('remark2'),
        bankName: document.getElementById('bankName'),
        bankAccount: document.getElementById('bankAccount'),
        bankBranchIfsc: document.getElementById('bankBranchIfsc'),
        bankIfscCode: document.getElementById('bankIfscCode'),
        
        // View Target Elements
        viewSellerName: document.getElementById('viewSellerName'),
        viewSellerAddr1: document.getElementById('viewSellerAddr1'),
        viewSellerAddr2: document.getElementById('viewSellerAddr2'),
        viewGstNo: document.getElementById('viewGstNo'),
        viewSellerPhone: document.getElementById('viewSellerPhone'),
        viewSellerEmail: document.getElementById('viewSellerEmail'),

        viewInvoiceNo: document.getElementById('viewInvoiceNo'),
        viewInvoiceDate: document.getElementById('viewInvoiceDate'),
        viewDeliveryNote: document.getElementById('viewDeliveryNote'),
        viewModeOfPayment: document.getElementById('viewModeOfPayment'),
        viewBuyerOrderNo: document.getElementById('viewBuyerOrderNo'),
        viewBuyerOrderDate: document.getElementById('viewBuyerOrderDate'),
        viewDispatchDocNo: document.getElementById('viewDispatchDocNo'),
        viewDispatchDocDate: document.getElementById('viewDispatchDocDate'),
        viewDispatchThrough: document.getElementById('viewDispatchThrough'),
        viewDestination: document.getElementById('viewDestination'),
        viewVehicleRow: document.getElementById('viewVehicleRow'),
        viewVehicleNo: document.getElementById('viewVehicleNo'),
        viewTermsRow: document.getElementById('viewTermsRow'),
        viewTermsOfDelivery: document.getElementById('viewTermsOfDelivery'),
        
        viewBuyerName: document.getElementById('viewBuyerName'),
        viewBuyerAddr1: document.getElementById('viewBuyerAddr1'),
        viewBuyerAddr2: document.getElementById('viewBuyerAddr2'),
        viewBuyerStatePin: document.getElementById('viewBuyerStatePin'),
        viewBuyerGstBox: document.getElementById('viewBuyerGstBox'),
        viewBuyerGstVal: document.getElementById('viewBuyerGstVal'),
        
        viewItemsTableBody: document.getElementById('viewItemsTableBody'),
        viewSubtotal: document.getElementById('viewSubtotal'),
        rowCgst: document.getElementById('rowCgst'),
        viewCgst: document.getElementById('viewCgst'),
        rowSgst: document.getElementById('rowSgst'),
        viewSgst: document.getElementById('viewSgst'),
        rowIgst: document.getElementById('rowIgst'),
        viewIgst: document.getElementById('viewIgst'),
        rowTransportation: document.getElementById('rowTransportation'),
        viewTransportation: document.getElementById('viewTransportation'),
        viewGrandTotal: document.getElementById('viewGrandTotal'),
        viewAmountInWords: document.getElementById('viewAmountInWords'),
        
        viewRemarksList: document.getElementById('viewRemarksList'),
        viewBankName: document.getElementById('viewBankName'),
        viewBankAccount: document.getElementById('viewBankAccount'),
        viewBankBranchIfsc: document.getElementById('viewBankBranchIfsc'),
        viewBankIfscCode: document.getElementById('viewBankIfscCode'),

        viewStampContainer: document.getElementById('viewStampContainer'),
        viewStampImage: document.getElementById('viewStampImage'),
        viewSigCompany: document.getElementById('viewSigCompany'),
        viewSigTitle: document.getElementById('viewSigTitle'),
        viewSigDesignation: document.getElementById('viewSigDesignation'),
        
        // Top Action Buttons
        btnLoadSample: document.getElementById('btnLoadSample'),
        btnReset: document.getElementById('btnReset'),
        btnHistory: document.getElementById('btnHistory'),
        btnPrintPdf: document.getElementById('btnPrintPdf'),
        btnExportDocx: document.getElementById('btnExportDocx'),
        
        // Mobile Navigation Tabs
        tabEditor: document.getElementById('tabEditor'),
        tabPreview: document.getElementById('tabPreview'),
        sidebar: document.querySelector('.sidebar'),
        previewViewport: document.querySelector('.preview-viewport'),

        // Modal Elements
        historyModal: document.getElementById('historyModal'),
        btnCloseHistory: document.getElementById('btnCloseHistory'),
        btnClearHistory: document.getElementById('btnClearHistory'),
        historyList: document.getElementById('historyList'),
        historyCount: document.getElementById('historyCount')
    };

    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Currency Formatting (Rupees INR)
    function formatRupees(amount) {
        return '₹' + Number(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Number to Words Converter for Indian Rupees
    function numberToWordsINR(num) {
        if (num === 0) return 'Rupees Zero Only.';
        
        const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                   'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        function inWords(n) {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
            if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
            if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
            if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
            return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
        }

        const integerPart = Math.floor(num);
        const decimalPart = Math.round((num - integerPart) * 100);

        let result = 'Rupees ' + inWords(integerPart);
        if (decimalPart > 0) {
            result += ' and ' + inWords(decimalPart) + ' Paise';
        }
        return result + ' Only.';
    }

    // Mobile Dynamic Scaling Helper
    function updateMobileScale() {
        const wrapper = document.querySelector('.sheet-wrapper');
        const sheet = document.getElementById('quotationSheet');
        if (!wrapper || !sheet) return;

        if (window.innerWidth <= 1024) {
            const containerWidth = wrapper.clientWidth - 20;
            const sheetWidth = 794;
            if (containerWidth < sheetWidth) {
                const scale = containerWidth / sheetWidth;
                sheet.style.transform = `scale(${scale})`;
                sheet.style.transformOrigin = 'top left';
                wrapper.style.height = `${sheet.offsetHeight * scale + 20}px`;
            } else {
                sheet.style.transform = 'none';
                wrapper.style.height = 'auto';
            }
        } else {
            sheet.style.transform = 'none';
            wrapper.style.height = 'auto';
        }
    }

    window.addEventListener('resize', updateMobileScale);

    // Mobile Navigation Tab Switcher
    if (el.tabEditor && el.tabPreview) {
        el.tabEditor.addEventListener('click', () => {
            el.tabEditor.classList.add('active');
            el.tabPreview.classList.remove('active');
            el.sidebar.classList.remove('active-tab');
            el.previewViewport.classList.remove('active-tab');
        });

        el.tabPreview.addEventListener('click', () => {
            el.tabPreview.classList.add('active');
            el.tabEditor.classList.remove('active');
            el.sidebar.classList.add('active-tab');
            el.previewViewport.classList.add('active-tab');
            setTimeout(updateMobileScale, 50);
        });
    }

    // Date formatting helper (YYYY-MM-DD -> DD/MM/YYYY)
    function formatDateDisplay(dateStr) {
        if (!dateStr) return '';
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
        return dateStr;
    }

    // Date picker input value converter (DD/MM/YYYY -> YYYY-MM-DD)
    function formatDatePickerVal(dateStr) {
        if (!dateStr) return '';
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
        }
        return dateStr;
    }

    // Bind basic text & date inputs to state & live update
    function bindFormInputs() {
        const fieldMap = [
            ['sellerName', 'viewSellerName'],
            ['sellerAddr1', 'viewSellerAddr1'],
            ['sellerAddr2', 'viewSellerAddr2'],
            ['sellerGst', 'viewGstNo'],
            ['sellerPhone', 'viewSellerPhone'],
            ['sellerEmail', 'viewSellerEmail'],
            ['invoiceNo', 'viewInvoiceNo'],
            ['deliveryNote', 'viewDeliveryNote'],
            ['modeOfPayment', 'viewModeOfPayment'],
            ['buyerOrderNo', 'viewBuyerOrderNo'],
            ['dispatchDocNo', 'viewDispatchDocNo'],
            ['dispatchThrough', 'viewDispatchThrough'],
            ['destination', 'viewDestination'],
            ['vehicleNo', 'viewVehicleNo'],
            ['termsOfDelivery', 'viewTermsOfDelivery'],
            ['buyerName', 'viewBuyerName'],
            ['buyerAddress1', 'viewBuyerAddr1'],
            ['buyerAddress2', 'viewBuyerAddr2'],
            ['buyerStatePin', 'viewBuyerStatePin'],
            ['buyerGst', 'viewBuyerGstVal'],
            ['bankName', 'viewBankName'],
            ['bankAccount', 'viewBankAccount'],
            ['bankBranchIfsc', 'viewBankBranchIfsc'],
            ['bankIfscCode', 'viewBankIfscCode'],
            ['sigTitle', 'viewSigTitle'],
            ['sigDesignation', 'viewSigDesignation']
        ];

        fieldMap.forEach(([inputId, viewId]) => {
            if (el[inputId]) {
                el[inputId].addEventListener('input', (e) => {
                    state[inputId] = e.target.value;
                    if (el[viewId]) el[viewId].textContent = e.target.value;
                    if (inputId === 'buyerGst' || inputId === 'vehicleNo') {
                        updateView();
                    }
                });
            }
        });

        // Stamp toggle listener
        if (el.selectShowStamp) {
            el.selectShowStamp.addEventListener('change', (e) => {
                state.showStamp = e.target.value;
                updateView();
            });
        }

        // Specific Date Picker Field Bindings
        const dateFields = [
            ['invoiceDate', 'viewInvoiceDate'],
            ['buyerOrderDate', 'viewBuyerOrderDate'],
            ['dispatchDocDate', 'viewDispatchDocDate']
        ];

        dateFields.forEach(([inputId, viewId]) => {
            if (el[inputId]) {
                el[inputId].value = formatDatePickerVal(state[inputId]);

                const handleDateChange = (e) => {
                    const rawVal = e.target.value;
                    const formatted = formatDateDisplay(rawVal);
                    state[inputId] = formatted;
                    if (el[viewId]) el[viewId].textContent = formatted;
                };

                el[inputId].addEventListener('input', handleDateChange);
                el[inputId].addEventListener('change', handleDateChange);
            }
        });

        // Tax Mode Switcher
        el.taxMode.addEventListener('change', (e) => {
            state.taxMode = e.target.value;
            if (state.taxMode === 'custom') {
                el.customTaxRow.classList.remove('hidden');
            } else {
                el.customTaxRow.classList.add('hidden');
            }
            updateView();
        });

        el.customTaxRate.addEventListener('input', (e) => {
            state.customTaxRate = parseFloat(e.target.value) || 0;
            updateView();
        });

        if (el.transportationFee) {
            el.transportationFee.addEventListener('input', (e) => {
                state.transportationFee = e.target.value;
                updateView();
            });
        }

        // Remarks Inputs
        el.remark1.addEventListener('input', (e) => {
            state.remark1 = e.target.value;
            renderRemarks();
        });
        el.remark2.addEventListener('input', (e) => {
            state.remark2 = e.target.value;
            renderRemarks();
        });

        // Preset Inserter
        el.btnAddPreset.addEventListener('click', () => {
            const key = el.presetSelect.value;
            if (!key || !PRESETS[key]) return;
            const itemPreset = PRESETS[key];
            state.items.push({
                id: Date.now(),
                sl: state.items.length + 1,
                desc: itemPreset.desc,
                hsn: itemPreset.hsn,
                qtyNum: itemPreset.qtyNum,
                unit: itemPreset.unit,
                rate: itemPreset.rate
            });
            renderItemsEditor();
            updateView();
        });

        // Add Custom Item Row
        el.btnAddItem.addEventListener('click', () => {
            state.items.push({
                id: Date.now(),
                sl: state.items.length + 1,
                desc: 'New Pole / Product Description',
                hsn: '7308',
                qtyNum: 1,
                unit: 'pcs',
                rate: 1000
            });
            renderItemsEditor();
            updateView();
        });

        // Action Toolbar Buttons
        el.btnLoadSample.addEventListener('click', loadSampleData);
        el.btnReset.addEventListener('click', resetForm);
        el.btnPrintPdf.addEventListener('click', triggerPrintPdf);
        el.btnExportDocx.addEventListener('click', exportDocxFile);
        
        // History Modal Triggers
        el.btnHistory.addEventListener('click', openHistoryModal);
        el.btnCloseHistory.addEventListener('click', closeHistoryModal);
        el.btnClearHistory.addEventListener('click', clearHistory);
    }

    // Render Form Line Item Editor Cards
    function renderItemsEditor() {
        el.itemsContainer.innerHTML = '';
        state.items.forEach((item, index) => {
            item.sl = index + 1; // re-index sequentially

            const card = document.createElement('div');
            card.className = 'item-row-card';
            card.innerHTML = `
                <div class="item-row-header">
                    <span class="item-row-title">Item #${item.sl}</span>
                    <button class="btn-remove-item" data-id="${item.id}" title="Remove Item">
                        <i data-lucide="trash-2" style="width:14px;height:14px"></i> Remove
                    </button>
                </div>
                <div class="form-group">
                    <label>Description of Goods</label>
                    <textarea class="form-control item-desc" data-id="${item.id}" rows="2">${item.desc}</textarea>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>HSN Code</label>
                        <input type="text" class="form-control item-hsn" data-id="${item.id}" value="${item.hsn}">
                    </div>
                    <div class="form-group">
                        <label>Qty & Unit</label>
                        <div class="row-group">
                            <input type="number" class="form-control item-qty" data-id="${item.id}" value="${item.qtyNum}" style="width:60px">
                            <input type="text" class="form-control item-unit" data-id="${item.id}" value="${item.unit}">
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>Rate (₹)</label>
                        <input type="number" class="form-control item-rate" data-id="${item.id}" value="${item.rate}" step="0.01">
                    </div>
                </div>
            `;
            el.itemsContainer.appendChild(card);
        });

        lucide.createIcons();

        // Attach event listeners to row inputs
        el.itemsContainer.querySelectorAll('.item-desc').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.desc = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-hsn').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.hsn = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-qty').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.qtyNum = parseFloat(e.target.value) || 0;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-unit').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.unit = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-rate').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.rate = parseFloat(e.target.value) || 0;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.dataset.id);
                state.items = state.items.filter(i => i.id !== id);
                renderItemsEditor();
                updateView();
            });
        });
    }

    // Render Printable Remarks List
    function renderRemarks() {
        el.viewRemarksList.innerHTML = '';
        [state.remark1, state.remark2].forEach(rem => {
            if (rem && rem.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = rem;
                el.viewRemarksList.appendChild(li);
            }
        });
    }

    // Update Live Printable Sheet View
    function updateView() {
        // Buyer GST Display
        if (el.viewBuyerGstBox) {
            if (state.buyerGst && state.buyerGst.trim() !== '') {
                el.viewBuyerGstBox.style.display = 'block';
                if (el.viewBuyerGstVal) el.viewBuyerGstVal.textContent = state.buyerGst;
            } else {
                el.viewBuyerGstBox.style.display = 'none';
            }
        }

        // Vehicle Number Display
        if (el.viewVehicleRow) {
            if (state.vehicleNo && state.vehicleNo.trim() !== '') {
                el.viewVehicleRow.style.display = 'table-row';
                if (el.viewVehicleNo) el.viewVehicleNo.textContent = state.vehicleNo;
            } else {
                el.viewVehicleRow.style.display = 'none';
            }
        }

        // Signature Stamp Overlay Display
        if (el.viewStampContainer) {
            if (state.showStamp === 'yes') {
                el.viewStampContainer.style.display = 'block';
            } else {
                el.viewStampContainer.style.display = 'none';
            }
        }

        // Signatory details
        if (el.viewSigCompany) el.viewSigCompany.textContent = 'For Sah Enterprise';
        if (el.viewSigTitle) el.viewSigTitle.textContent = state.sigTitle || 'Authorized Signatory';
        if (el.viewSigDesignation) el.viewSigDesignation.textContent = state.sigDesignation || 'Proprietor';

        // Render Line Items Table Body
        el.viewItemsTableBody.innerHTML = '';
        let subtotal = 0;

        state.items.forEach((item, index) => {
            const amount = item.qtyNum * item.rate;
            subtotal += amount;

            const qtyFormatted = String(item.qtyNum).padStart(2, '0') + (item.unit ? ' ' + item.unit : '');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="col-sl">${index + 1}.</td>
                <td class="col-desc"><div class="item-desc-text">${escapeHtml(item.desc)}</div></td>
                <td class="col-hsn">${escapeHtml(item.hsn)}</td>
                <td class="col-qty">${escapeHtml(qtyFormatted)}</td>
                <td class="col-rate">${formatRupees(item.rate)}</td>
                <td class="col-amount">${formatRupees(amount)}</td>
            `;
            el.viewItemsTableBody.appendChild(tr);
        });

        // Add padding blank rows if items count is small to maintain table height
        const minRows = 3;
        for (let i = state.items.length; i < minRows; i++) {
            const padTr = document.createElement('tr');
            padTr.innerHTML = `
                <td class="col-sl" style="height:40px">&nbsp;</td>
                <td class="col-desc">&nbsp;</td>
                <td class="col-hsn">&nbsp;</td>
                <td class="col-qty">&nbsp;</td>
                <td class="col-rate">&nbsp;</td>
                <td class="col-amount">&nbsp;</td>
            `;
            el.viewItemsTableBody.appendChild(padTr);
        }

        // Subtotal
        el.viewSubtotal.textContent = formatRupees(subtotal);

        // Tax Calculation Logic
        let cgstVal = 0, sgstVal = 0, igstVal = 0, grandTotal = subtotal;

        if (state.taxMode === 'igst18') {
            igstVal = subtotal * 0.18;
            grandTotal = subtotal + igstVal;

            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'table-row';

            el.viewIgst.textContent = formatRupees(igstVal);
        } else if (state.taxMode === 'cgst_sgst9') {
            cgstVal = subtotal * 0.09;
            sgstVal = subtotal * 0.09;
            grandTotal = subtotal + cgstVal + sgstVal;

            el.rowCgst.style.display = 'table-row';
            el.rowSgst.style.display = 'table-row';
            el.rowIgst.style.display = 'none';

            el.viewCgst.textContent = formatRupees(cgstVal);
            el.viewSgst.textContent = formatRupees(sgstVal);
        } else if (state.taxMode === 'custom') {
            const taxPerc = (state.customTaxRate || 0) / 100;
            igstVal = subtotal * taxPerc;
            grandTotal = subtotal + igstVal;

            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'table-row';

            el.rowIgst.cells[0].innerHTML = `<strong>Tax (${state.customTaxRate}%):</strong>`;
            el.viewIgst.textContent = formatRupees(igstVal);
        } else {
            // Exempt
            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'none';
            grandTotal = subtotal;
        }

        // Transportation Charges
        const freightVal = parseFloat(state.transportationFee) || 0;
        grandTotal += freightVal;

        if (el.rowTransportation) {
            if (freightVal > 0 || (state.transportationFee !== '' && state.transportationFee !== 0)) {
                el.rowTransportation.style.display = 'table-row';
                if (el.viewTransportation) el.viewTransportation.textContent = formatRupees(freightVal);
            } else {
                el.rowTransportation.style.display = 'none';
            }
        }

        el.viewGrandTotal.textContent = formatRupees(grandTotal);
        el.viewAmountInWords.textContent = numberToWordsINR(grandTotal);

        renderRemarks();
        updateMobileScale();
    }

    // HTML Escape Helper
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Load Sample Data (Matching reference PDF B4C637CA.pdf)
    function loadSampleData() {
        state.invoiceNo = 'SE-04/26-27';
        state.invoiceDate = '11/06/2026';
        state.deliveryNote = '';
        state.modeOfPayment = 'Online';
        state.buyerOrderNo = '';
        state.buyerOrderDate = '';
        state.dispatchDocNo = '';
        state.dispatchDocDate = '';
        state.dispatchThrough = 'Roadways';
        state.destination = 'Maa Kalyaneshwari Mandir, Maithon.';
        state.vehicleNo = 'WB 37C 1216';
        state.termsOfDelivery = '';
        
        state.buyerName = 'SIRAJUDDIN ANSARI';
        state.buyerAddress1 = 'NA, Gopalpur, Benagorai';
        state.buyerAddress2 = 'Nirsa, Dhanbad';
        state.buyerStatePin = 'Jharkhand- 828205';
        state.buyerGst = '20AGQPA2464E1ZX';
        
        state.taxMode = 'igst18';
        state.remark1 = '50% for booking and 100% payment before material dispatch.';
        state.remark2 = 'Transportation will be done by us and the fare will be borne by the buyer.';
        state.items = [
            {
                id: 1,
                sl: 1,
                desc: '5 mtr MS garden pole, single arm.',
                hsn: '7308',
                qtyNum: 10,
                unit: 'pcs',
                rate: 4900
            }
        ];

        // Populate Form Controls
        el.invoiceNo.value = state.invoiceNo;
        el.invoiceDate.value = formatDatePickerVal(state.invoiceDate);
        el.deliveryNote.value = state.deliveryNote;
        el.modeOfPayment.value = state.modeOfPayment;
        el.buyerOrderNo.value = state.buyerOrderNo;
        el.buyerOrderDate.value = formatDatePickerVal(state.buyerOrderDate);
        el.dispatchDocNo.value = state.dispatchDocNo;
        el.dispatchDocDate.value = formatDatePickerVal(state.dispatchDocDate);
        el.dispatchThrough.value = state.dispatchThrough;
        el.destination.value = state.destination;
        if (el.vehicleNo) el.vehicleNo.value = state.vehicleNo;
        el.termsOfDelivery.value = state.termsOfDelivery;

        el.buyerName.value = state.buyerName;
        el.buyerAddress1.value = state.buyerAddress1;
        el.buyerAddress2.value = state.buyerAddress2;
        el.buyerStatePin.value = state.buyerStatePin;
        if (el.buyerGst) el.buyerGst.value = state.buyerGst;
        if (el.remark1) el.remark1.value = state.remark1;
        if (el.remark2) el.remark2.value = state.remark2;

        el.taxMode.value = state.taxMode;
        el.customTaxRow.classList.add('hidden');

        el.viewInvoiceNo.textContent = state.invoiceNo;
        el.viewInvoiceDate.textContent = state.invoiceDate;
        el.viewDispatchThrough.textContent = state.dispatchThrough;
        el.viewDestination.textContent = state.destination;
        el.viewBuyerName.textContent = state.buyerName;
        el.viewBuyerAddr1.textContent = state.buyerAddress1;
        el.viewBuyerAddr2.textContent = state.buyerAddress2;
        el.viewBuyerStatePin.textContent = state.buyerStatePin;

        renderItemsEditor();
        updateView();
    }

    // Reset Form
    function resetForm() {
        if (!confirm('Are you sure you want to reset all form fields?')) return;
        state.items = [];
        state.buyerName = '';
        state.buyerAddress1 = '';
        state.buyerAddress2 = '';
        state.buyerStatePin = '';
        state.buyerGst = '';
        state.vehicleNo = '';
        
        el.buyerName.value = '';
        el.buyerAddress1.value = '';
        el.buyerAddress2.value = '';
        el.buyerStatePin.value = '';
        if (el.buyerGst) el.buyerGst.value = '';
        if (el.vehicleNo) el.vehicleNo.value = '';
        el.viewBuyerName.textContent = '';
        el.viewBuyerAddr1.textContent = '';
        el.viewBuyerAddr2.textContent = '';
        el.viewBuyerStatePin.textContent = '';

        renderItemsEditor();
        updateView();
    }

    // Trigger Browser PDF Print / Download
    function triggerPrintPdf() {
        saveToHistory();
        window.print();
    }

    // Export Editable Native DOCX Word File using docx.js library
    function exportDocxFile() {
        saveToHistory();

        if (typeof docx === 'undefined') {
            alert('Docx library is still loading. Please try again in 5 seconds.');
            return;
        }

        const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, BorderStyle, TableLayoutType, VerticalMergeType, HeightRule } = docx;

        const VMerge = VerticalMergeType || { RESTART: 'restart', CONTINUE: 'continue' };
        const HRule = HeightRule || { AT_LEAST: 'atLeast', EXACTLY: 'exact' };

        // Calculate Totals for DOCX
        let subtotal = 0;
        state.items.forEach(i => subtotal += (i.qtyNum * i.rate));

        let igstVal = 0, cgstVal = 0, sgstVal = 0, grandTotal = subtotal;

        if (state.taxMode === 'igst18') {
            igstVal = subtotal * 0.18;
            grandTotal = subtotal + igstVal;
        } else if (state.taxMode === 'cgst_sgst9') {
            cgstVal = subtotal * 0.09;
            sgstVal = subtotal * 0.09;
            grandTotal = subtotal + cgstVal + sgstVal;
        } else if (state.taxMode === 'custom') {
            const taxPerc = (state.customTaxRate || 0) / 100;
            igstVal = subtotal * taxPerc;
            grandTotal = subtotal + igstVal;
        }

        const borderStyleSolid = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
        const cellBorders = {
            top: borderStyleSolid,
            bottom: borderStyleSolid,
            left: borderStyleSolid,
            right: borderStyleSolid
        };

        const TOTAL_WIDTH_DXA = 10800;
        const colWidths = [756, 5184, 821, 1511, 1124, 1404]; // Total = 10800 DXA
        const leftWidth = colWidths[0] + colWidths[1];
        const rightCol1Width = colWidths[2] + colWidths[3];
        const rightCol2Width = colWidths[4] + colWidths[5];
        const rightFullWidth = colWidths[2] + colWidths[3] + colWidths[4] + colWidths[5];

        const masterTableRows = [];

        // --- ROW 0: Seller Info | Invoice No | Date ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.RESTART,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: state.sellerName, bold: true, size: 24 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.sellerAddr1, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.sellerAddr2, size: 18 })] }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: `GST NO. ${state.sellerGst}`, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Invoice no.: ", size: 18 }), new TextRun({ text: state.invoiceNo, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Date: ", bold: true, size: 18 }), new TextRun({ text: state.invoiceDate, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 1: Seller Info | Delivery Note | Mode of Payment ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Delivery Note: ", bold: true, size: 18 }), new TextRun({ text: state.deliveryNote || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Mode of Payment: ", bold: true, size: 18 }), new TextRun({ text: state.modeOfPayment || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 2: Seller Info | Phone no | Email ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Phone no.: ", bold: true, size: 18 }), new TextRun({ text: state.sellerPhone, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "E-mail: ", bold: true, size: 18 }), new TextRun({ text: state.sellerEmail, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 3: Buyer Details | Buyer's Order No | Dated ---
        const buyerCellChildren = [
            new Paragraph({ children: [new TextRun({ text: "Buyer Details:", size: 18 })] }),
            new Paragraph({ children: [new TextRun({ text: state.buyerName, bold: true, size: 20 })] }),
            new Paragraph({ children: [new TextRun({ text: state.buyerAddress1, size: 18 })] }),
            new Paragraph({ children: [new TextRun({ text: state.buyerAddress2, size: 18 })] }),
            new Paragraph({ children: [new TextRun({ text: state.buyerStatePin, size: 18 })] })
        ];

        if (state.buyerGst && state.buyerGst.trim() !== '') {
            buyerCellChildren.push(
                new Paragraph({ children: [new TextRun({ text: `GST NO. ${state.buyerGst}`, bold: true, size: 18 })] })
            );
        }

        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.RESTART,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: buyerCellChildren
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Buyer's Order No.: ", bold: true, size: 18 }), new TextRun({ text: state.buyerOrderNo || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dated: ", bold: true, size: 18 }), new TextRun({ text: state.buyerOrderDate || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 4: Buyer Details | Dispatch Doc No | Dated ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dispatch Document No.: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchDocNo || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dated: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchDocDate || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 5: Buyer Details | Dispatch through | Destination ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dispatch through: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchThrough, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Destination: ", bold: true, size: 18 }), new TextRun({ text: state.destination, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 6: Vehicle Number row ---
        if (state.vehicleNo && state.vehicleNo.trim() !== '') {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 2,
                            verticalMerge: VMerge.CONTINUE,
                            width: { size: leftWidth, type: WidthType.DXA },
                            borders: cellBorders,
                            children: []
                        }),
                        new TableCell({
                            columnSpan: 4,
                            width: { size: rightFullWidth, type: WidthType.DXA },
                            borders: cellBorders,
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "Vehicle Number: ", bold: true, size: 18 }), new TextRun({ text: state.vehicleNo || "-", size: 18 })] })
                            ]
                        })
                    ]
                })
            );
        }

        // --- ROW 7: Terms of delivery ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 4,
                        width: { size: rightFullWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Terms of delivery: ", bold: true, size: 18 }), new TextRun({ text: state.termsOfDelivery || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 8: Items Header Row ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ width: { size: colWidths[0], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sl. No.", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[1], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Description of Goods", bold: true, size: 18 })] })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[2], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "HSN", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[3], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Qty.", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[4], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Rate", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Amount", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        // --- ROW 9..N: Item Detail Rows ---
        const itemMinHeight = state.items.length <= 2 ? 3200 : 1800;

        state.items.forEach((item, idx) => {
            const amt = item.qtyNum * item.rate;
            masterTableRows.push(
                new TableRow({
                    height: { value: itemMinHeight, rule: HRule.AT_LEAST },
                    children: [
                        new TableCell({ width: { size: colWidths[0], type: WidthType.DXA }, children: [new Paragraph({ text: `${idx + 1}.`, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[1], type: WidthType.DXA }, children: [new Paragraph({ text: item.desc, size: 18 })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[2], type: WidthType.DXA }, children: [new Paragraph({ text: item.hsn, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[3], type: WidthType.DXA }, children: [new Paragraph({ text: `${item.qtyNum} ${item.unit}`, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[4], type: WidthType.DXA }, children: [new Paragraph({ text: `₹${item.rate.toFixed(2)}`, size: 18, alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ text: `₹${amt.toFixed(2)}`, size: 18, alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        });

        const span5Width = colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4];

        // Total Row
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Total:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${subtotal.toFixed(2)}`, bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        if (state.taxMode === 'igst18') {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "IGST 18%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${igstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        } else if (state.taxMode === 'cgst_sgst9') {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "CGST 9%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${cgstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "SGST 9%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${sgstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        }

        // Transportation Charges Row
        const freightVal = parseFloat(state.transportationFee) || 0;
        grandTotal += freightVal;

        if (freightVal > 0 || (state.transportationFee !== '' && state.transportationFee !== 0)) {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Transportation Charges:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${freightVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        }

        // Grand Total Row
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Grand Total:", bold: true, size: 20 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${grandTotal.toFixed(2)}`, bold: true, size: 20 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        // Amount in Words Row
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Amount In words: ", bold: true, size: 18 }), new TextRun({ text: numberToWordsINR(grandTotal), size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // Footer Row (Remarks Left / Bank Details Right)
        masterTableRows.push(
            new TableRow({
                height: { value: 1600, rule: HRule.AT_LEAST },
                children: [
                    new TableCell({
                        columnSpan: 2,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Remarks:", bold: true, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: `• ${state.remark1}`, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `• ${state.remark2}`, size: 17 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        width: { size: rightFullWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Company Bank Details", bold: true, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: `Bank name: `, size: 17 }), new TextRun({ text: state.bankName, bold: true, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `A/C No.: `, size: 17 }), new TextRun({ text: state.bankAccount, bold: true, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `Branch & IFSC Code: `, size: 17 }), new TextRun({ text: state.bankBranchIfsc, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.bankIfscCode, bold: true, size: 17 })] })
                        ]
                    })
                ]
            })
        );

        // Signature Section Row
        masterTableRows.push(
            new TableRow({
                height: { value: 1800, rule: HRule.AT_LEAST },
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: "For Sah Enterprise", bold: true, size: 18 })], alignment: AlignmentType.RIGHT }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: state.sigTitle || "Authorized Signatory", italic: true, size: 18 })], alignment: AlignmentType.RIGHT }),
                            new Paragraph({ children: [new TextRun({ text: state.sigDesignation || "Proprietor", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })
                        ]
                    })
                ]
            })
        );

        const singleMasterTable = new Table({
            width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
            layout: TableLayoutType.FIXED,
            columnWidths: colWidths,
            rows: masterTableRows
        });

        const doc = new Document({
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 720,
                                bottom: 720,
                                left: 720,
                                right: 720
                            }
                        }
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({ text: "TAX INVOICE", bold: true, underline: {}, size: 28 })],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({ text: "" }),
                        singleMasterTable
                    ]
                }
            ]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `TaxInvoice_${state.invoiceNo.replace(/[/\\?%*:|"<>]/g, '-')}.docx`);
        }).catch(err => {
            console.error('Docx Export Error:', err);
            alert('Failed to generate Word document.');
        });
    }

    // Local Storage History Management
    const STORAGE_KEY = 'sah_tax_invoice_history';

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveToHistory() {
        const history = getHistory();
        const record = {
            id: Date.now(),
            invoiceNo: state.invoiceNo,
            buyerName: state.buyerName,
            date: state.invoiceDate,
            timestamp: new Date().toLocaleString(),
            stateData: JSON.parse(JSON.stringify(state))
        };
        const existingIdx = history.findIndex(h => h.invoiceNo === state.invoiceNo && state.invoiceNo !== '');
        if (existingIdx >= 0) {
            history[existingIdx] = record;
        } else {
            history.unshift(record);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 30)));
        updateHistoryBadge();
    }

    function updateHistoryBadge() {
        const count = getHistory().length;
        if (el.historyCount) el.historyCount.textContent = count;
    }

    function openHistoryModal() {
        const history = getHistory();
        el.historyList.innerHTML = '';

        if (history.length === 0) {
            el.historyList.innerHTML = '<p class="text-muted">No saved Tax Invoices found in history.</p>';
        } else {
            history.forEach(item => {
                const div = document.createElement('div');
                div.className = 'history-item';
                div.innerHTML = `
                    <div>
                        <strong>${escapeHtml(item.invoiceNo || 'Untitled Invoice')}</strong> - ${escapeHtml(item.buyerName || 'Unknown Buyer')}
                        <br><small style="color:#64748b">${item.date || ''} (${item.timestamp})</small>
                    </div>
                    <button class="btn btn-secondary btn-load-history" data-id="${item.id}">Load Draft</button>
                `;
                el.historyList.appendChild(div);
            });

            el.historyList.querySelectorAll('.btn-load-history').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = Number(e.currentTarget.dataset.id);
                    const targetRecord = history.find(h => h.id === id);
                    if (targetRecord && targetRecord.stateData) {
                        Object.assign(state, targetRecord.stateData);
                        populateFormFromState();
                        updateView();
                        closeHistoryModal();
                    }
                });
            });
        }

        el.historyModal.classList.remove('hidden');
    }

    function closeHistoryModal() {
        el.historyModal.classList.add('hidden');
    }

    function clearHistory() {
        if (confirm('Are you sure you want to clear all saved invoice history?')) {
            localStorage.removeItem(STORAGE_KEY);
            updateHistoryBadge();
            openHistoryModal();
        }
    }

    function populateFormFromState() {
        if (el.sellerName) el.sellerName.value = state.sellerName;
        if (el.sellerAddr1) el.sellerAddr1.value = state.sellerAddr1;
        if (el.sellerAddr2) el.sellerAddr2.value = state.sellerAddr2;
        if (el.sellerGst) el.sellerGst.value = state.sellerGst;
        if (el.sellerPhone) el.sellerPhone.value = state.sellerPhone;
        if (el.sellerEmail) el.sellerEmail.value = state.sellerEmail;

        if (el.invoiceNo) el.invoiceNo.value = state.invoiceNo;
        if (el.invoiceDate) el.invoiceDate.value = formatDatePickerVal(state.invoiceDate);
        if (el.deliveryNote) el.deliveryNote.value = state.deliveryNote;
        if (el.modeOfPayment) el.modeOfPayment.value = state.modeOfPayment;
        if (el.buyerOrderNo) el.buyerOrderNo.value = state.buyerOrderNo;
        if (el.buyerOrderDate) el.buyerOrderDate.value = formatDatePickerVal(state.buyerOrderDate);
        if (el.dispatchDocNo) el.dispatchDocNo.value = state.dispatchDocNo;
        if (el.dispatchDocDate) el.dispatchDocDate.value = formatDatePickerVal(state.dispatchDocDate);
        if (el.dispatchThrough) el.dispatchThrough.value = state.dispatchThrough;
        if (el.destination) el.destination.value = state.destination;
        if (el.vehicleNo) el.vehicleNo.value = state.vehicleNo;
        if (el.termsOfDelivery) el.termsOfDelivery.value = state.termsOfDelivery;

        if (el.buyerName) el.buyerName.value = state.buyerName;
        if (el.buyerAddress1) el.buyerAddress1.value = state.buyerAddress1;
        if (el.buyerAddress2) el.buyerAddress2.value = state.buyerAddress2;
        if (el.buyerStatePin) el.buyerStatePin.value = state.buyerStatePin;
        if (el.buyerGst) el.buyerGst.value = state.buyerGst;

        if (el.taxMode) el.taxMode.value = state.taxMode;
        if (el.remark1) el.remark1.value = state.remark1;
        if (el.remark2) el.remark2.value = state.remark2;
        if (el.bankName) el.bankName.value = state.bankName;
        if (el.bankAccount) el.bankAccount.value = state.bankAccount;
        if (el.bankBranchIfsc) el.bankBranchIfsc.value = state.bankBranchIfsc;
        if (el.bankIfscCode) el.bankIfscCode.value = state.bankIfscCode;

        if (el.selectShowStamp) el.selectShowStamp.value = state.showStamp;
        if (el.sigTitle) el.sigTitle.value = state.sigTitle;
        if (el.sigDesignation) el.sigDesignation.value = state.sigDesignation;

        renderItemsEditor();
    }

    // Initialize Application
    bindFormInputs();
    populateFormFromState();
    updateView();
    updateHistoryBadge();

});
