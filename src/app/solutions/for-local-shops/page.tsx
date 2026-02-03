'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Smartphone, MapPin, FileText, ShoppingCart, TrendingUp, Handshake, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedText } from '@/components/shared/animated-text';

const content = {
    en: {
        title: "For Local Shops",
        heading: "Empowering Neighborhood Businesses",
        intro: [
            "Local shops are not just commercial spaces — they are deeply rooted in the daily lives of communities. From early-morning kirana stores and trusted medical shops to neighborhood salons, repair centers, cafés, and family-run retail outlets, these businesses thrive on personal relationships, consistency, and trust built over years. They serve customers who return not because of discounts or ads, but because of familiarity, reliability, and human connection.",
            "However, the environment around local businesses is changing rapidly. Customers now expect faster service, digital payment options, accurate pricing, and online visibility — even from neighborhood shops. At the same time, shop owners continue to manage daily operations manually, juggling billing, inventory, suppliers, taxes, and compliance, often without dedicated staff or technical support. This creates pressure, inefficiencies, and limits growth.",
            "Our solutions are designed specifically for everyday local businesses — practical, affordable, and easy-to-use systems that strengthen how your shop operates without changing its soul. We don’t try to turn local shops into complex enterprises. Instead, we quietly modernize operations, improve visibility, and simplify compliance so shop owners can focus on what matters most: serving customers and growing sustainably."
        ],
        whyTitle: "Why Local Shops Need Digital Support Today",
        whyPoints: {
            customerBehavior: {
                title: "Changing Customer Behavior",
                items: ["Customers search on Google before visiting nearby shops", "Preference for digital payments and online ordering", "Expectation of faster billing and accurate pricing", "Demand for better service, availability, and convenience"],
                icon: Smartphone
            },
            operationalChallenges: {
                title: "Operational Challenges",
                items: ["Manual billing and inventory tracking", "Stock shortages or over-purchasing", "Time lost in paperwork and daily calculations", "Difficulty managing GST and tax records"],
                icon: TrendingUp
            },
            growingCompetition: {
                title: "Growing Competition",
                items: ["Organized retail chains and online marketplaces", "Shops with stronger digital visibility", "Businesses offering speed, convenience, and seamless service"],
                icon: Handshake
            },
        },
        challengeConclusion: "Our solutions address these challenges head-on, helping local shops stay competitive, profitable, and future-ready.",
        howTitle: "How We Empower Neighborhood Businesses",
        howPoints: [
            {
                step: "1️⃣",
                title: "Digitize Daily Operations",
                description: "We replace manual processes with simple digital systems that are easy to use and quick to adopt — even for first-time users.",
                items: ["Digital billing instead of handwritten bills", "Automated calculations and GST handling", "Real-time stock updates after every sale", "Clear daily, weekly, and monthly sales visibility", "Reduced dependency on manual work and guesswork"],
                result: "Result: fewer mistakes, faster service, and smoother daily operations — even during peak hours.",
                imageId: "local_shop_billing"
            },
            {
                step: "2️⃣",
                title: "Expand Local Reach",
                description: "Your shop doesn’t need to be online everywhere — it just needs to be visible where your customers are searching.",
                items: ["Appear on Google Maps and local search results", "Show accurate shop details, timings, and location", "Build trust through reviews and ratings", "Attract nearby customers actively searching to buy"],
                result: "Result: online searches turn into walk-in customers.",
                imageId: "local_seo_maps"
            },
            {
                step: "3️⃣",
                title: "Simplify Compliance & Records",
                description: "Compliance should never slow down your business. We make it easy, automated, and stress-free.",
                items: ["Automated GST-ready billing", "Organized sales and purchase records", "Return-ready reports for filing", "Reduced dependency on accountants for daily work", "Fewer errors, penalties, and last-minute stress"],
                result: "Result: you stay compliant without spending hours on paperwork.",
                imageId: "tax_compliance_docs"
            }
        ],
        solutionsTitle: "Solutions Built for Local Shops",
        solutions: [
            {
                icon: Smartphone,
                title: "Inventory & Billing Apps",
                description: "Inventory and billing are the heart of any shop. Manual tracking often leads to loss, confusion, and wasted time. Our apps are designed to work exactly the way local shops operate.",
                subItems: {
                    features: {
                        title: "Features",
                        items: ["Simple and fast billing process", "GST-compliant invoices", "Automatic inventory updates", "Low-stock alerts", "Supplier and product tracking", "Daily, weekly, and monthly reports"]
                    },
                    howItHelps: {
                        title: "How It Helps",
                        items: ["Faster checkout and shorter queues", "Better stock planning", "Reduced wastage and losses", "Clear understanding of profits", "Reliable records for audits and taxes"]
                    }
                }
            },
            {
                icon: MapPin,
                title: "Local SEO & Google Maps Presence",
                description: "Most customers search online before stepping out. If your shop doesn’t appear, they choose someone else.",
                subItems: {
                    whatWeSetUp: {
                        title: "What We Set Up",
                        items: ["Google Business Profile creation or optimization", "Correct address, location pin, timings, and categories", "Business photos and service details", "Local keyword optimization", "Review management guidance"]
                    },
                    businessImpact: {
                        title: "Business Impact",
                        items: ["Increased foot traffic", "More calls and direction requests", "Stronger trust with new customers", "Better visibility than nearby competitors", "Continuous local discovery"]
                    }
                }
            },
            {
                icon: FileText,
                title: "GST & Tax Automation",
                description: "GST and tax compliance can be confusing for small businesses. We simplify it using automation.",
                 subItems: {
                    whatsIncluded: {
                        title: "What’s Included",
                        items: ["GST-enabled billing", "Automatic tax calculations", "Organized sales and purchase data", "Monthly and quarterly summaries", "Compliance reminders"]
                    },
                    benefits: {
                        title: "Benefits",
                        items: ["Reduced stress during filing", "Fewer calculation errors", "Time savings every month", "Better financial clarity", "Confidence during inspections"]
                    }
                }
            },
            {
                icon: ShoppingCart,
                title: "Easy Online Store Setup",
                description: "Even local shops can sell online without becoming complicated e-commerce businesses.",
                subItems: {
                    whatWeProvide: {
                        title: "What We Provide",
                        items: ["Simple online store connected to your shop", "Product listing and pricing setup", "Digital payment options", "Order and delivery management", "Mobile-friendly customer experience"]
                    },
                    whyItMatters: {
                        title: "Why It Matters",
                        items: ["Accept orders beyond shop hours", "Sell via WhatsApp and social media", "Reach customers who prefer online ordering", "Increase overall sales without high costs", "Stay relevant in a digital-first market"]
                    }
                }
            }
        ],
        idealForTitle: "Designed for Real Local Businesses",
        idealForItems: [
            "Kirana & grocery stores", "Medical & pharmacy shops", "Clothing & footwear stores", "Electronics & mobile shops", "Salons, cafés, and service providers", "Any small or neighborhood business"
        ],
        resultTitle: "The Result for Your Shop",
        resultItems: ["Digitally enabled daily operations", "Faster service and happier customers", "Better inventory and sales control", "Simplified GST and compliance", "Increased local visibility and reach", "A modern, future-ready neighborhood business"],
    },
    hi: {
        title: "पड़ोस के व्यवसायों को सशक्त बनाना",
        heading: "पड़ोस के व्यवसायों को सशक्त बनाना",
        intro: [
            "स्थानीय दुकानें केवल व्यापारिक स्थान नहीं होतीं — वे समुदाय के दैनिक जीवन में गहराई से जुड़ी होती हैं। सुबह-सुबह खुलने वाली किराना दुकानें, भरोसेमंद मेडिकल स्टोर, पड़ोस के सैलून, रिपेयर सेंटर, कैफ़े और पारिवारिक रिटेल आउटलेट्स वर्षों से व्यक्तिगत रिश्तों, निरंतर सेवा और विश्वास पर चलते आ रहे हैं। ग्राहक छूट या विज्ञापन के कारण नहीं, बल्कि परिचय, भरोसे और मानवीय जुड़ाव के कारण वापस आते हैं।",
            "लेकिन स्थानीय व्यवसायों के आसपास का माहौल तेज़ी से बदल रहा है। आज ग्राहक तेज़ सेवा, डिजिटल भुगतान विकल्प, सही कीमत और ऑनलाइन उपस्थिति की उम्मीद करते हैं — यहाँ तक कि छोटी दुकानों से भी। वहीं दूसरी ओर, दुकानदार आज भी मैन्युअल तरीकों से बिलिंग, इन्वेंट्री, सप्लायर्स, टैक्स और कंप्लायंस संभाल रहे हैं, अक्सर बिना किसी समर्पित स्टाफ या तकनीकी सहायता के। इससे दबाव बढ़ता है, कार्य में असुविधा होती है और विकास सीमित रह जाता है।",
            "हमारे समाधान विशेष रूप से रोज़मर्रा के स्थानीय व्यवसायों के लिए बनाए गए हैं — सरल, किफायती और उपयोग में आसान सिस्टम जो आपकी दुकान के कामकाज को मज़बूत बनाते हैं, बिना उसकी पहचान बदले। हम स्थानीय दुकानों को जटिल एंटरप्राइज़ में बदलने की कोशिश नहीं करते। इसके बजाय, हम चुपचाप संचालन को आधुनिक बनाते हैं, दृश्यता बढ़ाते हैं और कंप्लायंस को सरल करते हैं, ताकि दुकानदार अपने मुख्य उद्देश्य पर ध्यान दे सकें: ग्राहकों की सेवा और सतत विकास।"
        ],
        whyTitle: "आज स्थानीय दुकानों को डिजिटल सपोर्ट क्यों चाहिए",
        whyPoints: {
            customerBehavior: {
                title: "बदलता ग्राहक व्यवहार",
                items: ["ग्राहक पास की दुकान पर जाने से पहले Google पर खोज करते हैं", "डिजिटल भुगतान और ऑनलाइन ऑर्डर की बढ़ती पसंद", "तेज़ बिलिंग और सही कीमत की अपेक्षा", "बेहतर सेवा, उपलब्धता और सुविधा की मांग"],
                icon: Smartphone
            },
            operationalChallenges: {
                title: "संचालन संबंधी चुनौतियाँ",
                items: ["मैन्युअल बिलिंग और इन्वेंट्री ट्रैकिंग", "स्टॉक की कमी या ज़रूरत से ज़्यादा खरीद", "कागज़ी काम और रोज़ाना गणनाओं में समय की बर्बादी", "GST और टैक्स रिकॉर्ड संभालने में कठिनाई"],
                icon: TrendingUp
            },
            growingCompetition: {
                title: "बढ़ती प्रतिस्पर्धा",
                items: ["संगठित रिटेल चेन और ऑनलाइन मार्केटप्लेस", "डिजिटल रूप से ज़्यादा दिखाई देने वाली दुकानें", "तेज़, सुविधाजनक और स्मूद सेवा देने वाले व्यवसाय"],
                icon: Handshake
            },
        },
        challengeConclusion: "हमारे समाधान इन चुनौतियों का सीधे सामना करते हैं और स्थानीय दुकानों को प्रतिस्पर्धी, लाभदायक और भविष्य के लिए तैयार बनाते हैं।",
        howTitle: "हम पड़ोस के व्यवसायों को कैसे सशक्त बनाते हैं",
        howPoints: [
            {
                step: "1️⃣",
                title: "दैनिक संचालन को डिजिटल बनाना",
                description: "हम मैन्युअल प्रक्रियाओं को सरल डिजिटल सिस्टम से बदलते हैं, जो उपयोग में आसान हैं और पहली बार इस्तेमाल करने वालों के लिए भी सहज हैं।",
                items: ["हाथ से लिखे बिलों की जगह डिजिटल बिलिंग", "ऑटोमेटेड कैलकुलेशन और GST हैंडलिंग", "हर बिक्री के बाद रियल-टाइम स्टॉक अपडेट", "दैनिक, साप्ताहिक और मासिक बिक्री की स्पष्ट जानकारी", "मैन्युअल काम और अनुमान पर निर्भरता कम"],
                result: "परिणाम: कम गलतियाँ, तेज़ सेवा और पीक समय में भी सुचारू संचालन।",
                imageId: "local_shop_billing"
            },
            {
                step: "2️⃣",
                title: "स्थानीय पहुंच बढ़ाना",
                description: "आपकी दुकान को हर जगह ऑनलाइन होने की ज़रूरत नहीं है — बस वहाँ दिखना ज़रूरी है जहाँ आपके ग्राहक खोज कर रहे हैं।",
                items: ["Google Maps और लोकल सर्च रिज़ल्ट्स में दिखना", "सही दुकान विवरण, समय और लोकेशन", "रिव्यू और रेटिंग के ज़रिए भरोसा बनाना", "खरीदने के इरादे से खोज रहे पास के ग्राहकों को आकर्षित करना"],
                result: "परिणाम: ऑनलाइन खोजें वॉक-इन ग्राहकों में बदल जाती हैं।",
                imageId: "local_seo_maps"
            },
            {
                step: "3️⃣",
                title: "कंप्लायंस और रिकॉर्ड को सरल बनाना",
                description: "कंप्लायंस कभी भी आपके व्यवसाय को धीमा नहीं करना चाहिए। हम इसे आसान, ऑटोमेटेड और तनावमुक्त बनाते हैं।",
                items: ["ऑटोमेटेड GST-रेडी बिलिंग", "सुव्यवस्थित बिक्री और खरीद रिकॉर्ड", "फाइलिंग के लिए तैयार रिपोर्ट्स", "रोज़मर्रा के काम में अकाउंटेंट पर निर्भरता कम", "कम गलतियाँ, पेनल्टी और आख़िरी समय का तनाव"],
                result: "परिणाम: कम समय में कंप्लायंस और बेहतर वित्तीय स्पष्टता।",
                imageId: "tax_compliance_docs"
            }
        ],
        solutionsTitle: "स्थानीय दुकानों के लिए बनाए गए समाधान",
        solutions: [
            {
                icon: Smartphone,
                title: "इन्वेंट्री और बिलिंग ऐप्स",
                description: "इन्वेंट्री और बिलिंग किसी भी दुकान का मूल आधार हैं। मैन्युअल ट्रैकिंग अक्सर नुकसान, भ्रम और समय की बर्बादी का कारण बनती है। हमारे ऐप्स स्थानीय दुकानों के वास्तविक कामकाज के अनुसार बनाए गए हैं।",
                subItems: {
                    features: {
                        title: "फ़ीचर्स",
                        items: ["सरल और तेज़ बिलिंग प्रक्रिया", "GST-अनुरूप इनवॉइस", "ऑटोमेटिक इन्वेंट्री अपडेट", "लो-स्टॉक अलर्ट", "सप्लायर और प्रोडक्ट ट्रैकिंग", "दैनिक, साप्ताहिक और मासिक रिपोर्ट्स"]
                    },
                    howItHelps: {
                        title: "यह कैसे मदद करता है",
                        items: ["तेज़ चेकआउट और कम कतारें", "बेहतर स्टॉक प्लानिंग", "कम वेस्टेज और नुकसान", "मुनाफ़े की स्पष्ट समझ", "ऑडिट और टैक्स के लिए भरोसेमंद रिकॉर्ड"]
                    }
                }
            },
            {
                icon: MapPin,
                title: "लोकल SEO और Google Maps उपस्थिति",
                description: "ज़्यादातर ग्राहक बाहर निकलने से पहले ऑनलाइन खोज करते हैं। अगर आपकी दुकान दिखाई नहीं देती, तो वे किसी और को चुन लेते हैं।",
                subItems: {
                    whatWeSetUp: {
                        title: "हम क्या सेटअप करते हैं",
                        items: ["Google Business Profile बनाना या ऑप्टिमाइज़ करना", "सही पता, लोकेशन पिन, समय और कैटेगरी", "बिज़नेस फ़ोटो और सर्विस डिटेल्स", "लोकल कीवर्ड ऑप्टिमाइज़ेशन", "रिव्यू मैनेजमेंट गाइडेंस"]
                    },
                    businessImpact: {
                        title: "व्यवसाय पर प्रभाव",
                        items: ["वॉक-इन ग्राहकों में वृद्धि", "ज़्यादा कॉल और डायरेक्शन रिक्वेस्ट", "नए ग्राहकों के साथ मज़बूत भरोसा", "पास के प्रतिस्पर्धियों से बेहतर दृश्यता", "लगातार लोकल डिस्कवरी"]
                    }
                }
            },
            {
                icon: FileText,
                title: "GST और टैक्स ऑटोमेशन",
                description: "GST और टैक्स कंप्लायंस छोटे व्यवसायों के लिए अक्सर जटिल होता है। हम इसे ऑटोमेशन के ज़रिए सरल बनाते हैं।",
                 subItems: {
                    whatsIncluded: {
                        title: "इसमें शामिल है",
                        items: ["GST-एनेबल्ड बिलिंग", "ऑटोमेटिक टैक्स कैलकुलेशन", "व्यवस्थित बिक्री और खरीद डेटा", "मासिक और तिमाही सारांश", "कंप्लायंस रिमाइंडर"]
                    },
                    benefits: {
                        title: "लाभ",
                        items: ["फाइलिंग के समय कम तनाव", "कम गणना त्रुटियाँ", "हर महीने समय की बचत", "बेहतर वित्तीय स्पष्टता", "जांच और ऑडिट के समय आत्मविश्वास"]
                    }
                }
            },
            {
                icon: ShoppingCart,
                title: "आसान ऑनलाइन स्टोर सेटअप",
                description: "अब स्थानीय दुकानें भी ऑनलाइन बेच सकती हैं, बिना जटिल ई-कॉमर्स बिज़नेस बने।",
                subItems: {
                    whatWeProvide: {
                        title: "हम क्या प्रदान करते हैं",
                        items: ["आपकी दुकान से जुड़ा सरल ऑनलाइन स्टोर", "प्रोडक्ट लिस्टिंग और प्राइसिंग सेटअप", "डिजिटल पेमेंट विकल्प", "ऑर्डर और डिलीवरी मैनेजमेंट", "मोबाइल-फ्रेंडली ग्राहक अनुभव"]
                    },
                    whyItMatters: {
                        title: "यह क्यों ज़रूरी है",
                        items: ["दुकान बंद होने के बाद भी ऑर्डर स्वीकार करना", "WhatsApp और सोशल मीडिया के ज़रिए बिक्री", "ऑनलाइन खरीद पसंद करने वाले ग्राहकों तक पहुँचना", "बिना ज़्यादा खर्च के बिक्री बढ़ाना", "डिजिटल-फ़र्स्ट मार्केट में प्रासंगिक बने रहना"]
                    }
                }
            }
        ],
        idealForTitle: "वास्तविक स्थानीय व्यवसायों के लिए डिज़ाइन किया गया",
        idealForItems: [
            "किराना और ग्रॉसरी स्टोर", "मेडिकल और फ़ार्मेसी शॉप", "कपड़े और फुटवियर स्टोर", "इलेक्ट्रॉनिक्स और मोबाइल शॉप", "सैलून, कैफ़े और सर्विस प्रोवाइडर्स", "कोई भी छोटा या पड़ोस का व्यवसाय"
        ],
        resultTitle: "आपकी दुकान के लिए परिणाम",
        resultItems: ["डिजिटल रूप से सक्षम दैनिक संचालन", "तेज़ सेवा और खुश ग्राहक", "बेहतर इन्वेंट्री और बिक्री नियंत्रण", "सरल GST और कंप्लायंस", "बढ़ी हुई स्थानीय दृश्यता और पहुँच", "एक आधुनिक, भविष्य के लिए तैयार स्थानीय व्यवसाय"],
    },
    mr: {
        title: "स्थानिक व्यवसायांचे सक्षमीकरण",
        heading: "स्थानिक व्यवसायांचे सक्षमीकरण",
        intro: [
            "स्थानिक दुकाने म्हणजे केवळ व्यावसायिक ठिकाणे नाहीत — ती आपल्या समाजाच्या दैनंदिन जीवनाचा अविभाज्य भाग आहेत. पहाटे उघडणारी किराणा दुकाने, विश्वासार्ह मेडिकल स्टोअर्स, परिसरातील सलून, दुरुस्ती केंद्रे, कॅफे आणि कौटुंबिक रिटेल दुकाने ही वर्षानुवर्षे वैयक्तिक नातेसंबंध, सातत्य आणि विश्वासावर उभी आहेत. ग्राहक सूट किंवा जाहिरातीमुळे नव्हे, तर ओळख, विश्वास आणि मानवी नात्यामुळे परत येतात.",
            "मात्र आज स्थानिक व्यवसायांच्या भोवतालची परिस्थिती वेगाने बदलत आहे. ग्राहकांना आता जलद सेवा, डिजिटल पेमेंट पर्याय, अचूक किंमत आणि ऑनलाइन उपस्थिती अपेक्षित आहे — अगदी छोट्या दुकानांकडूनही. त्याच वेळी दुकानदार अजूनही मॅन्युअल पद्धतीने बिलिंग, स्टॉक, सप्लायर्स, GST आणि कंप्लायंस हाताळत आहेत, अनेकदा कोणतीही तांत्रिक मदत नसताना. यामुळे ताण वाढतो, अकार्यक्षमता निर्माण होते आणि वाढ मर्यादित राहते.",
            "आमची सोल्युशन्स रोजच्या स्थानिक व्यवसायांसाठी खास तयार केलेली आहेत — सोपी, परवडणारी आणि वापरण्यास सुलभ डिजिटल साधने जी तुमच्या दुकानाची ओळख न बदलता त्याचे कार्य अधिक मजबूत करतात. आम्ही स्थानिक दुकाने जटिल एंटरप्राइझमध्ये बदलण्याचा प्रयत्न करत नाही. त्याऐवजी, आम्ही शांतपणे ऑपरेशन्स आधुनिक करतो, स्थानिक दृश्यमानता वाढवतो आणि कंप्लायंस सुलभ करतो, जेणेकरून दुकानदार ग्राहकसेवा आणि शाश्वत वाढीवर लक्ष केंद्रित करू शकतील."
        ],
        whyTitle: "आज स्थानिक दुकानांना डिजिटल सपोर्ट का आवश्यक आहे",
        whyPoints: {
            customerBehavior: {
                title: "बदलते ग्राहक वर्तन",
                items: ["ग्राहक दुकानात येण्यापूर्वी Google वर शोध घेतात", "डिजिटल पेमेंट आणि ऑनलाइन ऑर्डरची वाढती पसंती", "जलद बिलिंग आणि अचूक किंमत अपेक्षित", "चांगली सेवा, उपलब्धता आणि सोयीची मागणी"],
                icon: Smartphone
            },
            operationalChallenges: {
                title: "ऑपरेशनल अडचणी",
                items: ["मॅन्युअल बिलिंग आणि स्टॉक ट्रॅकिंग", "स्टॉक कमी पडणे किंवा जास्त खरेदी", "कागदपत्रे आणि रोजच्या गणनांमध्ये वेळ वाया जाणे", "GST आणि टॅक्स नोंदी हाताळण्यात अडचण"],
                icon: TrendingUp
            },
            growingCompetition: {
                title: "वाढती स्पर्धा",
                items: ["संघटित रिटेल चेन आणि ऑनलाइन मार्केटप्लेस", "डिजिटल उपस्थिती मजबूत असलेली दुकाने", "जलद, सोयीस्कर आणि सलग सेवा देणारे व्यवसाय"],
                icon: Handshake
            },
        },
        challengeConclusion: "आमची सोल्युशन्स या सर्व आव्हानांना थेट सामोरे जातात आणि स्थानिक दुकाने स्पर्धात्मक, नफ्याचे आणि भविष्यासाठी सज्ज बनवतात.",
        howTitle: "आम्ही स्थानिक व्यवसायांना कसे सक्षम करतो",
        howPoints: [
            {
                step: "1️⃣",
                title: "दैनंदिन ऑपरेशन्स डिजिटल करणे",
                description: "आम्ही मॅन्युअल प्रक्रिया सोप्या डिजिटल प्रणालींनी बदलतो, ज्या वापरण्यास सोप्या आणि नवीन वापरकर्त्यांसाठीही पटकन स्वीकारण्यायोग्य आहेत.",
                items: ["हस्तलिखित बिलांऐवजी डिजिटल बिलिंग", "ऑटोमेटेड गणना आणि GST हाताळणी", "प्रत्येक विक्रीनंतर रिअल-टाइम स्टॉक अपडेट", "दैनंदिन, साप्ताहिक आणि मासिक विक्री अहवाल", "मॅन्युअल कामावर अवलंबित्व कमी"],
                result: "परिणाम: कमी चुका, जलद सेवा आणि पीक वेळेतही सुरळीत ऑपरेशन्स.",
                imageId: "local_shop_billing"
            },
            {
                step: "2️⃣",
                title: "स्थानिक पोहोच वाढवणे",
                description: "तुमच्या दुकानाला सर्वत्र ऑनलाइन असण्याची गरज नाही — फक्त जिथे तुमचे ग्राहक शोधत आहेत तिथे दिसणे आवश्यक आहे.",
                items: ["Google Maps आणि लोकल सर्चमध्ये उपस्थिती", "अचूक दुकान माहिती, वेळा आणि लोकेशन", "रिव्ह्यू आणि रेटिंगद्वारे विश्वास निर्माण", "खरेदीसाठी शोध घेणाऱ्या जवळच्या ग्राहकांना आकर्षित करणे"],
                result: "परिणाम: ऑनलाइन शोध प्रत्यक्ष दुकानात येणाऱ्या ग्राहकांमध्ये बदलतो.",
                imageId: "local_seo_maps"
            },
            {
                step: "3️⃣",
                title: "कंप्लायंस आणि नोंदी सुलभ करणे",
                description: "कंप्लायन्सने तुमचा व्यवसाय कधीही मंद करू नये. आम्ही ते सोपे, स्वयंचलित आणि तणावमुक्त करतो.",
                items: ["ऑटोमेटेड GST-रेडी बिलिंग", "विक्री व खरेदीच्या सुव्यवस्थित नोंदी", "फाइलिंगसाठी तयार अहवाल", "रोजच्या कामात अकाउंटंटवर कमी अवलंबित्व", "कमी चुका, दंड आणि ताण"],
                result: "परिणाम: तणावमुक्त कंप्लायंस आणि स्पष्ट आर्थिक स्थिती.",
                imageId: "tax_compliance_docs"
            }
        ],
        solutionsTitle: "स्थानिक दुकानांसाठी तयार केलेली सोल्युशन्स",
        solutions: [
            {
                icon: Smartphone,
                title: "इन्व्हेंटरी आणि बिलिंग अ‍ॅप्स",
                description: "इन्व्हेंटरी आणि बिलिंग हे कोणत्याही दुकानाचे हृदय आहे. मॅन्युअल ट्रॅकिंगमुळे अनेकदा नुकसान, गोंधळ आणि वेळेचा अपव्यय होतो. आमचे अ‍ॅप्स स्थानिक दुकाने जशी चालतात त्याच पद्धतीने काम करण्यासाठी डिझाइन केलेले आहेत.",
                subItems: {
                    features: {
                        title: "वैशिष्ट्ये",
                        items: ["सोपी आणि जलद बिलिंग प्रक्रिया", "GST-सुसंगत इनव्हॉइस", "ऑटोमेटिक स्टॉक अपडेट्स", "लो-स्टॉक अलर्ट्स", "सप्लायर व प्रॉडक्ट ट्रॅकिंग", "दैनिक, साप्ताहिक व मासिक रिपोर्ट्स"]
                    },
                    howItHelps: {
                        title: "कसे मदत होते",
                        items: ["जलद चेकआउट आणि कमी रांगा", "उत्तम स्टॉक नियोजन", "वेस्टेज आणि नुकसान कमी", "नफ्याची स्पष्ट समज", "ऑडिट आणि टॅक्ससाठी विश्वासार्ह नोंदी"]
                    }
                }
            },
            {
                icon: MapPin,
                title: "लोकल SEO आणि Google Maps उपस्थिती",
                description: "बहुतेक ग्राहक बाहेर पडण्यापूर्वी ऑनलाइन शोध घेतात. जर तुमचे दुकान दिसले नाही, तर ते दुसऱ्या कोणालातरी निवडतात.",
                subItems: {
                    whatWeSetUp: {
                        title: "आम्ही काय सेटअप करतो",
                        items: ["Google Business Profile तयार करणे किंवा ऑप्टिमाइझ करणे", "योग्य पत्ता, लोकेशन पिन, वेळा आणि कॅटेगरीज", "व्यवसाय फोटो आणि सेवा तपशील", "स्थानिक कीवर्ड ऑप्टिमायझेशन", "पुनरावलोकन व्यवस्थापन मार्गदर्शन"]
                    },
                    businessImpact: {
                        title: "व्यवसायावर परिणाम",
                        items: ["वॉक-इन ग्राहकांमध्ये वाढ", "अधिक कॉल्स आणि दिशानिर्देश विनंत्या", "नवीन ग्राहकांमध्ये मजबूत विश्वास", "परिसरातील स्पर्धकांपेक्षा चांगली दृश्यमानता", "सातत्यपूर्ण लोकल डिस्कव्हरी"]
                    }
                }
            },
            {
                icon: FileText,
                title: "GST आणि टॅक्स ऑटोमेशन",
                description: "GST आणि टॅक्स कंप्लायन्स छोट्या व्यवसायांसाठी गोंधळात टाकणारे असू शकते. आम्ही ते ऑटोमेशनद्वारे सोपे करतो.",
                 subItems: {
                    whatsIncluded: {
                        title: "यात काय समाविष्ट आहे",
                        items: ["GST-सक्षम बिलिंग", "स्वयंचलित कर गणना", "संघटित विक्री आणि खरेदी डेटा", "मासिक आणि त्रैमासिक सारांश", "कंप्लायन्स रिमाइंडर"]
                    },
                    benefits: {
                        title: "फायदे",
                        items: ["फाइलिंग दरम्यान कमी ताण", "कमी गणना चुका", "दर महिन्याला वेळेची बचत", "आर्थिक स्पष्टता", "तपासणीवेळी आत्मविश्वास"]
                    }
                }
            },
            {
                icon: ShoppingCart,
                title: "सोपा ऑनलाइन स्टोअर सेटअप",
                description: "स्थानिक दुकानेही आता जटिल ई-कॉमर्स व्यवसाय न बनता ऑनलाइन विक्री करू शकतात.",
                subItems: {
                    whatWeProvide: {
                        title: "आम्ही काय देतो",
                        items: ["तुमच्या दुकानाशी जोडलेले सोपे ऑनलाइन स्टोअर", "उत्पादन सूची आणि किंमत सेटअप", "डिजिटल पेमेंट पर्याय", "ऑर्डर आणि डिलिव्हरी व्यवस्थापन", "मोबाइल-अनुकूल ग्राहक अनुभव"]
                    },
                    whyItMatters: {
                        title: "हे का महत्त्वाचे आहे",
                        items: ["दुकान बंद असतानाही ऑर्डर स्वीकारणे", "WhatsApp आणि सोशल मीडियावर विक्री", "ऑनलाइन खरेदी पसंत करणाऱ्या ग्राहकांपर्यंत पोहोच", "कमी खर्चात विक्री वाढ", "डिजिटल-फर्स्ट बाजारात सुसंगतता"]
                    }
                }
            }
        ],
        idealForTitle: "वास्तविक स्थानिक व्यवसायांसाठी डिझाइन केलेले",
        idealForItems: [
            "किराणा आणि किराणा दुकाने", "मेडिकल आणि फार्मसी दुकाने", "कपडे आणि पादत्राणे दुकाने", "इलेक्ट्रॉनिक्स आणि मोबाइल दुकाने", "सलून, कॅफे आणि सेवा प्रदाते", "कोणताही छोटा किंवा शेजारचा व्यवसाय"
        ],
        resultTitle: "तुमच्या दुकानासाठी अंतिम परिणाम",
        resultItems: ["डिजिटलरित्या सक्षम दैनंदिन ऑपरेशन्स", "जलद सेवा आणि समाधानी ग्राहक", "उत्तम स्टॉक आणि विक्री नियंत्रण", "सुलभ GST आणि कंप्लायंस", "वाढलेली स्थानिक पोहोच", "एक आधुनिक, भविष्य-तयार स्थानिक व्यवसाय"],
    }
};

const WhySection = ({ points }: { points: any }) => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {Object.values(points).map((point: any, index) => (
                 <Card key={index} className="text-left bg-card">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                                <point.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-lg text-primary">{point.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                           {point.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </li>
                           ))}
                        </ul>
                    </CardContent>
                 </Card>
            ))}
        </div>
    )
};

const HowSection = ({ point, index }: { point: any, index: number }) => {
    const image = PlaceHolderImages.find(p => p.id === point.imageId);
    const isEven = index % 2 === 0;

    return (
        <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? '' : 'md:grid-flow-row-dense'}`}>
            <div className={`aspect-square rounded-lg overflow-hidden relative ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={point.title}
                        fill
                        data-ai-hint={image.imageHint}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
             <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                <h3 className="font-headline text-3xl font-bold">
                    <span className="text-primary mr-2">{point.step}</span>
                    {point.title}
                </h3>
                <p className="mt-4 text-lg text-muted-foreground">{point.description}</p>
                <ul className="mt-6 space-y-3">
                    {point.items.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-primary/80 mt-1" />
                            <span className="font-medium text-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 font-semibold text-primary border-l-4 border-primary pl-4">{point.result}</p>
            </div>
        </div>
    )
}

const SolutionCard = ({ solution }: { solution: any }) => {
    return (
        <Card className="p-6 h-full transition-all hover:shadow-lg hover:-translate-y-1">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                    <solution.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">{solution.title}</h3>
            </div>
            <p className="text-muted-foreground mb-6">{solution.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
                {Object.values(solution.subItems).map((sub: any, i) => (
                    <div key={i}>
                        <h4 className="font-semibold mb-2">{sub.title}</h4>
                        <ul className="space-y-2">
                           {sub.items.map((item: string, j: number) => (
                                <li key={j} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Card>
    )
};


export default function ForLocalShopsPage() {
    const { language } = useLanguage();
    const t = content[language] || content.en;

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                 <div className="container py-8 md:py-12">
                     <Button variant="ghost" asChild className="mb-8">
                        <Link href="/#solutions">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Solutions
                        </Link>
                    </Button>
                    
                    <header className="text-center mb-16">
                        <p className="font-bold text-primary tracking-wider uppercase text-sm md:text-base">
                            {t.title}
                        </p>
                        <AnimatedText
                            el="h1"
                            text={t.heading}
                            className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2 leading-tight"
                        />
                    </header>

                    <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground space-y-6 mb-16 text-center">
                        {t.intro.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                 </div>

                 <section className="py-12 md:py-16 bg-muted/20">
                     <div className="container">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.whyTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        <WhySection points={t.whyPoints} />
                         <p className="mt-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto">{t.challengeConclusion}</p>
                     </div>
                 </section>

                <section className="py-12 md:py-24">
                     <div className="container space-y-24">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.howTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        {t.howPoints.map((point, index) => (
                            <HowSection key={index} point={point} index={index} />
                        ))}
                     </div>
                </section>

                <section className="py-12 md:py-16 bg-muted/20">
                    <div className="container">
                        <header className="text-center mb-12">
                             <AnimatedText
                                el="h2"
                                text={t.solutionsTitle}
                                className="font-headline text-3xl font-bold tracking-tighter"
                             />
                        </header>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {t.solutions.map((solution, i) => (
                                <SolutionCard key={i} solution={solution} />
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-12 md:py-16">
                     <div className="container text-center max-w-4xl">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary text-center">{t.idealForTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                                    {t.idealForItems.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-primary/80 mt-1 flex-shrink-0" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/10 mt-12 border-primary/30">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary text-center">{t.resultTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                                    {t.resultItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-left">
                                            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                            <span className="font-semibold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                     </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
