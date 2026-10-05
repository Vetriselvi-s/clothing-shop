import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Banknote, ArrowLeft, Printer, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/clothing';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onCompleteOrder: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onCompleteOrder
}) => {
  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmation'>('shipping');

  // Customer Form
  const [formData, setFormData] = useState({
    fullName: 'Camille Dubois',
    email: 'c.dubois@fashionatelier.com',
    phone: '+1 (555) 382-9012',
    street: '148 Mercer Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const deliveryCost = deliveryMethod === 'express' ? 15 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = Math.max(0, subtotal - discount + deliveryCost + tax);

  const handleNextToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('delivery');
  };

  const handleNextToPayment = () => {
    setStep('payment');
  };

  const handleFinalizeOrder = () => {
    const orderNumber = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      id: orderNumber,
      items: [...items],
      subtotal,
      discount,
      shippingFee: deliveryCost,
      total,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      deliveryMethod:
        deliveryMethod === 'express'
          ? 'Boutique Priority Express (1-2 Days)'
          : deliveryMethod === 'pickup'
          ? 'Flagship Boutique Concierge Pickup'
          : 'Complimentary Carbon-Neutral Courier (3-5 Days)',
      shippingAddress: { ...formData },
      paymentMethod:
        paymentMethod === 'card'
          ? 'Credit Card (Ending in 4242)'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (Verified)'
          : 'Apple Pay Express',
      status: 'Confirmed',
      estimatedDelivery: '3 to 5 business days'
    };

    setConfirmedOrder(newOrder);
    onCompleteOrder(newOrder);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F6] w-full max-w-3xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-xl font-bold tracking-tight text-stone-900 uppercase">
              L’ATELIER
            </span>
            <span className="text-stone-300">/</span>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              {step === 'confirmation' ? 'Order Receipt' : 'Encrypted Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Progress (when not confirmation) */}
        {step !== 'confirmation' && (
          <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-[11px] uppercase tracking-wider font-medium text-stone-500">
            <span className={step === 'shipping' ? 'text-stone-900 font-bold' : ''}>
              1. Address
            </span>
            <span>&rarr;</span>
            <span className={step === 'delivery' ? 'text-stone-900 font-bold' : ''}>
              2. Shipping
            </span>
            <span>&rarr;</span>
            <span className={step === 'payment' ? 'text-stone-900 font-bold' : ''}>
              3. Payment
            </span>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Shipping Address */}
          {step === 'shipping' && (
            <form onSubmit={handleNextToDelivery} className="space-y-4">
              <h3 className="text-lg font-light text-stone-900 font-editorial">
                Customer & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Email for Tracking</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Phone (Courier Updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-stone-700 font-medium mb-1">Street Address & Suite / Apt</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">State / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 text-stone-900 focus:outline-stone-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-7 py-3 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
                >
                  Continue to Delivery Method &rarr;
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Method */}
          {step === 'delivery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-light text-stone-900 font-editorial">
                  Select Delivery Courier
                </h3>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Edit Address</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryMethod === 'standard' ? 'bg-white border-stone-900 shadow-xs' : 'bg-stone-50 border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-stone-800" />
                    <div>
                      <p className="font-semibold text-stone-900">Complimentary Carbon-Neutral Shipping</p>
                      <p className="text-stone-500">Delivered within 3–5 business days via DHL Express Eco</p>
                    </div>
                  </div>
                  <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">Free</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryMethod === 'express' ? 'bg-white border-stone-900 shadow-xs' : 'bg-stone-50 border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PackageCheck size={18} className="text-stone-800" />
                    <div>
                      <p className="font-semibold text-stone-900">Boutique Priority Courier</p>
                      <p className="text-stone-500">Next-day guaranteed delivery with signature upon receipt</p>
                    </div>
                  </div>
                  <span className="font-semibold text-stone-900 tabular-nums">+$15.00</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryMethod === 'pickup' ? 'bg-white border-stone-900 shadow-xs' : 'bg-stone-50 border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-stone-800" />
                    <div>
                      <p className="font-semibold text-stone-900">Concierge In-Store Pickup</p>
                      <p className="text-stone-500">Ready in 2 hours at Soho NYC or Rue Saint-Honoré Paris</p>
                    </div>
                  </div>
                  <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">Free</span>
                </label>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  onClick={handleNextToPayment}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-7 py-3 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
                >
                  Proceed to Payment &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-light text-stone-900 font-editorial">
                  Payment Method
                </h3>
                <span className="text-sm font-semibold text-stone-900 tabular-nums">
                  Total: ${total.toLocaleString()}
                </span>
              </div>

              {/* Payment Type Selection */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard size={18} />
                  <span className="font-medium">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Banknote size={18} />
                  <span className="font-medium">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 border text-center transition-colors cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'applepay'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <ShieldCheck size={18} />
                  <span className="font-medium">Apple Pay</span>
                </button>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-white border border-stone-300 space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 p-2 font-mono text-stone-900 focus:outline-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full bg-stone-50 border border-stone-300 p-2 font-mono text-stone-900 focus:outline-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">Security Code (CVV)</label>
                      <input
                        type="password"
                        defaultValue="849"
                        className="w-full bg-stone-50 border border-stone-300 p-2 font-mono text-stone-900 focus:outline-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-stone-100 border border-stone-300 space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2 font-semibold text-stone-900">
                    <Banknote size={16} />
                    <span>Cash on Delivery Verification</span>
                  </div>
                  <p className="leading-relaxed">
                    You will settle the balance of <strong className="text-stone-900 tabular-nums">${total.toLocaleString()}</strong> in cash upon physical delivery. Our concierge will send an SMS dispatch notice prior to arrival.
                  </p>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-6 bg-stone-100 border border-stone-300 text-center space-y-2 text-xs">
                  <p className="text-stone-700">Authenticated via Secure Biometric Device Token.</p>
                  <p className="text-stone-500 font-mono">Ready to authorize ${total.toLocaleString()}</p>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('delivery')}
                  className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  onClick={handleFinalizeOrder}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Check size={16} />
                  <span>Authorize & Place Order · ${total.toLocaleString()}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2 py-4 border-b border-stone-200">
                <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={24} />
                </div>
                <h3 className="text-2xl font-light text-stone-900 font-editorial">
                  Order Successfully Confirmed
                </h3>
                <p className="text-xs text-stone-500">
                  Receipt and tracking transmission sent to <strong>{confirmedOrder.shippingAddress.email}</strong>
                </p>
                <div className="pt-2 inline-flex items-center gap-2 text-xs bg-stone-100 px-3 py-1 text-stone-800 font-mono">
                  <span>Order Identifier:</span>
                  <span className="font-bold">{confirmedOrder.id}</span>
                </div>
              </div>

              {/* Delivery Stepper */}
              <div className="bg-[#F5F4F0] p-4 border border-stone-200 space-y-3">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                  Fulfillment Status Tracker
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase font-medium">
                  <div className="space-y-1">
                    <div className="h-1 bg-stone-900" />
                    <span className="text-stone-900 font-bold">1. Confirmed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-stone-900" />
                    <span className="text-stone-900 font-bold">2. Hand-Inspected</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-stone-400" />
                    <span className="text-stone-500">3. In Transit</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-stone-300" />
                    <span className="text-stone-400">4. Delivered</span>
                  </div>
                </div>
              </div>

              {/* Itemized Receipt */}
              <div className="space-y-3 text-xs">
                <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                  Garment Summary ({confirmedOrder.items.length} items)
                </h4>
                <div className="divide-y divide-stone-200 border-t border-b border-stone-200 py-1">
                  {confirmedOrder.items.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-stone-900 font-editorial text-sm">{item.product.name}</p>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity} · Size: {item.selectedSize} · Color: {item.selectedColor.name}
                        </p>
                      </div>
                      <span className="font-semibold text-stone-900 tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-xs text-stone-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-stone-900">${confirmedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {confirmedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Voucher Savings</span>
                      <span className="tabular-nums font-medium">-${confirmedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="tabular-nums font-medium text-stone-900">
                      {confirmedOrder.shippingFee === 0 ? 'Complimentary' : `$${confirmedOrder.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Settled</span>
                    <span className="tabular-nums">${confirmedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Address info */}
              <div className="p-3 bg-stone-100 text-xs text-stone-600 leading-relaxed">
                <p><strong>Shipping To:</strong> {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.postalCode}</p>
                <p><strong>Payment Authorization:</strong> {confirmedOrder.paymentMethod}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => window.print()}
                  className="border border-stone-300 hover:border-stone-900 text-stone-800 px-4 py-2 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2 text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
