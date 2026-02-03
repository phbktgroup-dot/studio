'use client';

import { useLanguage } from '@/context/language-provider';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, BrainCircuit, TrendingUp, Goal, Cog, Cloud, Target, Briefcase, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedText } from '@/components/shared/animated-text';

const content = {
    en: {
        title: "For Startups",
        heading: "From Idea to Scalable, Investable Business",
        intro: [
            "Startups are born from bold ideas, strong conviction, and the desire to solve real-world problems in better, faster, or entirely new ways. But transforming an idea into a successful startup is never just about building a product. Founders must navigate uncertainty, limited resources, time pressure, and constant decision-making — all while trying to validate their vision, attract users, and build something that can scale.",
            "In the early stages, every decision matters. Choosing the wrong market, building the wrong features, rushing development without a solid foundation, or ignoring compliance and financial structure can slow growth or even cause failure. At the same time, moving too slowly can mean losing momentum and missing market opportunities. This delicate balance makes structured guidance and execution support critical for startups.",
            "Our startup-focused solutions are designed to guide founders through every phase — from idea validation and MVP development to launch, growth, compliance, and investor readiness. We combine strategy, technology, design, marketing, and operations to help startups reduce risk, move faster with confidence, and build businesses that are scalable, sustainable, and attractive to investors."
        ],
        whyTitle: "Why Startups Need Structured Support",
        whyPoints: {
            earlyStage: {
                title: "Early-Stage Challenges",
                items: ["Unclear problem definition and target audience", "Unvalidated ideas and assumptions", "Limited budgets and small teams", "Pressure to launch quickly without compromising quality", "Lack of strategic roadmap and priorities"],
                icon: BrainCircuit
            },
            growthStage: {
                title: "Growth-Stage Challenges",
                items: ["Scaling technology and infrastructure", "Acquiring and retaining customers consistently", "Managing operations, data, and internal workflows", "Handling legal, tax, and compliance requirements"],
                icon: TrendingUp
            },
            marketPressure: {
                title: "Competitive & Market Pressure",
                items: ["Rapidly changing markets and customer expectations", "Well-funded and fast-moving competitors", "Need for speed, differentiation, and innovation"],
                icon: Goal
            },
        },
        challengeConclusion: "Our solutions help startups replace guesswork with clarity and chaos with structure.",
        howTitle: "How We Empower Startups",
        howPoints: [
            {
                step: "1️⃣",
                title: "Validate Ideas & Build Strong Foundations",
                description: "Before heavy investment, startups must ensure they are building the right solution for a real problem.",
                items: ["Market research and industry analysis", "Customer interviews and validation", "Product-market fit assessment", "Business model and revenue strategy", "MVP scope definition and roadmap planning", "Early risk identification and mitigation"],
                result: "Result: clarity, confidence, and a solid strategic foundation.",
                imageId: "startup_validate_idea"
            },
            {
                step: "2️⃣",
                title: "Build & Launch Scalable Digital Products",
                description: "We transform validated ideas into reliable, high-performance digital products designed for growth.",
                items: ["Web and mobile application development", "Modular, scalable system architecture", "UI/UX design focused on usability and adoption", "Secure, cloud-ready infrastructure", "Agile development with rapid iterations", "Performance, security, and scalability built-in"],
                result: "Result: launch-ready products that can scale without rework.",
                imageId: "startup_build_product"
            },
            {
                step: "3️⃣",
                title: "Drive Growth & Market Entry",
                description: "Launching a product is only the beginning. We help startups gain traction and measurable growth.",
                items: ["Go-to-market (GTM) strategy", "Brand identity and positioning", "Content, performance, and growth marketing", "Analytics, tracking, and KPI setup", "Funnel and conversion optimization"],
                result: "Result: faster traction, real users, and sustainable growth.",
                imageId: "startup_growth_market"
            },
             {
                step: "4️⃣",
                title: "Prepare for Scale, Compliance & Investment",
                description: "As startups mature, they must be ready for scale, audits, and investor scrutiny.",
                items: ["Scalable internal processes and automation", "Business registration, tax, and compliance readiness", "Financial modeling, projections, and unit economics", "Investor pitch decks and storytelling", "Risk management and governance frameworks"],
                result: "Result: investor-ready startups with long-term scalability.",
                imageId: "startup_scale_invest"
            }
        ],
        solutionsTitle: "Solutions Built for Startups",
        solutions: [
            { icon: Cog, title: "Rapid MVP Development", description: "Fast MVP builds with modern tech stacks.", features: { title: "Includes", items: ["Feature prioritization and cost control", "Early user feedback and iteration", "Reduced time-to-market"] } },
            { icon: Cloud, title: "Scalable Cloud Architecture", description: "Secure and performance-optimized cloud infrastructure.", features: { title: "Includes", items: ["Auto-scaling systems", "Multi-cloud setup", "Future-ready technology foundation"] } },
            { icon: Target, title: "Go-To-Market & Branding", description: "Comprehensive strategy for a successful launch.", features: { title: "Includes", items: ["Brand identity and messaging", "Growth-focused marketing plans", "Content and social media setup"] } },
            { icon: Briefcase, title: "Business Setup & Compliance", description: "Full support for incorporation and regulatory needs.", features: { title: "Includes", items: ["Tax and regulatory structuring", "Financial and operational setup", "Compliance planning for scale"] } },
        ],
        idealForTitle: "Designed for Startup Stages",
        idealForItems: ["Idea-stage founders", "Early-stage startups", "Product and tech startups", "SaaS and digital platforms", "Founders preparing for funding or expansion"],
        resultTitle: "The Result for Your Startup",
        resultItems: ["Clear strategic direction", "Faster and smarter execution", "Reduced risk and rework", "Strong technology and product foundation", "Investor and scale readiness", "Sustainable, long-term growth"],
    },
    hi: {
        title: "स्टार्टअप के लिए",
        heading: "विचार से निवेश-योग्य और स्केलेबल बिज़नेस तक",
        intro: [
            "स्टार्टअप साहसिक विचारों और वास्तविक समस्याओं को हल करने की इच्छा से जन्म लेते हैं। लेकिन किसी आइडिया को सफल स्टार्टअप में बदलना केवल प्रोडक्ट बनाने तक सीमित नहीं होता। संस्थापकों को सीमित संसाधनों, तेज़ फैसलों, बाज़ार की अनिश्चितता और बढ़ते दबाव के बीच सही दिशा चुननी होती है।",
            "शुरुआती चरण में गलत निर्णय — जैसे गलत बाज़ार चुनना, बिना सत्यापन के प्रोडक्ट बनाना, कमजोर टेक्नोलॉजी फाउंडेशन या कंप्लायंस की अनदेखी — विकास को धीमा कर सकते हैं या स्टार्टअप को असफल भी कर सकते हैं। वहीं, बहुत धीमी गति अवसरों को खोने का कारण बनती है। इसलिए संरचित मार्गदर्शन और सही एक्ज़ीक्यूशन बेहद ज़रूरी हो जाता है।",
            "हमारे स्टार्टअप समाधान आइडिया वेलिडेशन से लेकर स्केल और निवेश तैयारी तक संस्थापकों का साथ देते हैं। हम रणनीति, टेक्नोलॉजी, डिज़ाइन, मार्केटिंग और ऑपरेशन्स को एक साथ लाकर स्टार्टअप्स को सुरक्षित, तेज़ और आत्मविश्वास के साथ आगे बढ़ने में मदद करते हैं।"
        ],
        whyTitle: "स्टार्टअप्स को संरचित सपोर्ट क्यों चाहिए",
        whyPoints: {
            earlyStage: {
                title: "शुरुआती चुनौतियाँ",
                items: ["समस्या और टार्गेट ऑडियंस की अस्पष्टता", "बिना वेलिडेशन के आइडिया", "सीमित बजट और छोटी टीम", "तेज़ लॉन्च का दबाव", "स्पष्ट रोडमैप की कमी"],
                icon: BrainCircuit
            },
            growthStage: {
                title: "ग्रोथ की चुनौतियाँ",
                items: ["टेक्नोलॉजी और सिस्टम स्केल करना", "लगातार ग्राहक अधिग्रहण", "आंतरिक प्रक्रियाओं का निर्माण", "कानूनी, टैक्स और कंप्लायंस प्रबंधन"],
                icon: TrendingUp
            },
            marketPressure: {
                title: "प्रतिस्पर्धा और बाजार का दबाव",
                items: ["तेज़ी से बदलते बाज़ार", "अच्छी तरह से वित्तपोषित प्रतिस्पर्धी", "गति और नवाचार की आवश्यकता"],
                icon: Goal
            },
        },
        challengeConclusion: "हमारे समाधान स्टार्टअप्स को अनुमान की जगह स्पष्टता और अव्यवस्था की जगह संरचना प्रदान करते हैं।",
        howTitle: "हम स्टार्टअप्स को कैसे सशक्त बनाते हैं",
        howPoints: [
            {
                step: "1️⃣",
                title: "आइडिया वेलिडेशन और मजबूत आधार",
                description: "भारी निवेश से पहले, स्टार्टअप को यह सुनिश्चित करना होगा कि वे एक वास्तविक समस्या के लिए सही समाधान बना रहे हैं।",
                items: ["मार्केट रिसर्च और ग्राहक इंटरव्यू", "प्रोडक्ट-मार्केट फिट", "बिज़नेस मॉडल और रेवेन्यू रणनीति", "MVP प्लानिंग और रोडमैप"],
                result: "परिणाम: स्पष्टता, आत्मविश्वास, और एक ठोस रणनीतिक आधार।",
                imageId: "startup_validate_idea"
            },
            {
                step: "2️⃣",
                title: "स्केलेबल प्रोडक्ट निर्माण",
                description: "हम मान्य विचारों को विकास के लिए डिज़ाइन किए गए विश्वसनीय, उच्च-प्रदर्शन वाले डिजिटल उत्पादों में बदलते हैं।",
                items: ["वेब और मोबाइल ऐप डेवलपमेंट", "स्केलेबल आर्किटेक्चर", "UI/UX डिज़ाइन", "सुरक्षित क्लाउड इंफ्रास्ट्रक्चर"],
                result: "परिणाम: लॉन्च के लिए तैयार उत्पाद जो बिना किसी बदलाव के बढ़ सकते हैं।",
                imageId: "startup_build_product"
            },
            {
                step: "3️⃣",
                title: "ग्रोथ और मार्केट एंट्री",
                description: "एक उत्पाद लॉन्च करना केवल शुरुआत है। हम स्टार्टअप को पकड़ बनाने और मापने योग्य विकास हासिल करने में मदद करते हैं।",
                items: ["गो-टू-मार्केट रणनीति", "ब्रांडिंग और डिजिटल मार्केटिंग", "एनालिटिक्स और कन्वर्ज़न ट्रैकिंग"],
                result: "परिणाम: तेज़ पकड़, वास्तविक उपयोगकर्ता और स्थायी विकास।",
                imageId: "startup_growth_market"
            },
            {
                step: "4️⃣",
                title: "स्केल और निवेश तैयारी",
                description: "जैसे-जैसे स्टार्टअप परिपक्व होते हैं, उन्हें स्केल, ऑडिट और निवेशक जांच के लिए तैयार रहना चाहिए।",
                items: ["कंप्लायंस और फाइनेंशियल तैयारी", "फाइनेंशियल मॉडलिंग", "पिच डेक और फंडिंग सपोर्ट"],
                result: "परिणाम: निवेशक-तैयार स्टार्टअप्स जिनकी दीर्घकालिक स्केलेबिलिटी है।",
                imageId: "startup_scale_invest"
            }
        ],
        solutionsTitle: "स्टार्टअप्स के लिए बनाए गए समाधान",
        solutions: [
            { icon: Cog, title: "रैपिड MVP डेवलपमेंट", description: "आधुनिक टेक स्टैक के साथ तेज़ MVP निर्माण।", features: { title: "शामिल है", items: ["फ़ीचर प्राथमिकता", "प्रारंभिक उपयोगकर्ता प्रतिक्रिया", "कम टाइम-टू-मार्केट"] } },
            { icon: Cloud, title: "स्केलेबल क्लाउड आर्किटेक्चर", description: "सुरक्षित और प्रदर्शन-अनुकूलित क्लाउड अवसंरचना।", features: { title: "शामिल है", items: ["ऑटो-स्केलिंग सिस्टम", "मल्टी-क्लाउड सेटअप", "भविष्य के लिए तैयार तकनीक"] } },
            { icon: Target, title: "गो-टू-मार्केट और ब्रांडिंग", description: "एक सफल लॉन्च के लिए व्यापक रणनीति।", features: { title: "शामिल है", items: ["ब्रांड पहचान और संदेश", "विकास-केंद्रित विपणन योजनाएं", "कंटेंट और सोशल मीडिया सेटअप"] } },
            { icon: Briefcase, title: "बिजनेस सेटअप और कंप्लायंस", description: "निगमन और नियामक जरूरतों के लिए पूर्ण समर्थन।", features: { title: "शामिल है", items: ["कर और नियामक संरचना", "वित्तीय और परिचालन सेटअप", "स्केल के लिए अनुपालन योजना"] } },
        ],
        idealForTitle: "स्टार्टअप चरणों के लिए डिज़ाइन किया गया",
        idealForItems: ["आइडिया-स्टेज संस्थापक", "प्रारंभिक चरण के स्टार्टअप", "उत्पाद और तकनीक स्टार्टअप", "SaaS और डिजिटल प्लेटफॉर्म", "फंडिंग या विस्तार की तैयारी कर रहे संस्थापक"],
        resultTitle: "आपके स्टार्टअप के लिए परिणाम",
        resultItems: ["स्पष्ट रणनीतिक दिशा", "तेज़ और स्मार्ट निष्पादन", "कम जोखिम और पुनर्कार्य", "मजबूत प्रौद्योगिकी और उत्पाद नींव", "निवेशक और पैमाने के लिए तत्परता", "सतत, दीर्घकालिक विकास"],
    },
    mr: {
        title: "Startups साठी",
        heading: "कल्पनेपासून स्केलेबल आणि गुंतवणूक-योग्य व्यवसायापर्यंत",
        intro: [
            "स्टार्टअप्स धाडसी कल्पना, स्पष्ट दृष्टी आणि वास्तवातील समस्या सोडवण्याच्या इच्छेतून जन्माला येतात। मात्र एखादी कल्पना यशस्वी स्टार्टअपमध्ये रूपांतरित करणे म्हणजे केवळ प्रोडक्ट तयार करणे नव्हे। संस्थापकांना मर्यादित संसाधने, जलद निर्णय, बाजारातील अनिश्चितता आणि वाढता दबाव यांचा सामना करावा लागतो।",
            "सुरुवातीच्या टप्प्यात चुकीचे निर्णय — जसे की चुकीचा बाजार निवडणे, पडताळणीशिवाय प्रोडक्ट तयार करणे, कमकुवत टेक पाया किंवा कंप्लायंसकडे दुर्लक्ष — स्टार्टअपच्या वाढीला अडथळा ठरू शकतात। त्यामुळे योग्य मार्गदर्शन आणि संरचित अंमलबजावणी अत्यंत महत्त्वाची ठरते।",
            "आमची स्टार्टअप सोल्युशन्स कल्पना पडताळणीपासून ते स्केल आणि गुंतवणूक तयारीपर्यंत संस्थापकांना साथ देतात। आम्ही रणनीती, तंत्रज्ञान, डिझाइन, मार्केटिंग आणि ऑपरेशन्स एकत्र करून स्टार्टअप्सना सुरक्षित, वेगवान आणि आत्मविश्वासाने वाढण्यास मदत करतो।"
        ],
        whyTitle: "स्टार्टअप्सना संरचित सपोर्ट का आवश्यक आहे",
        whyPoints: {
            earlyStage: {
                title: "सुरुवातीच्या अडचणी",
                items: ["समस्या आणि टार्गेट युजर्स अस्पष्ट", "पडताळणी नसलेल्या कल्पना", "मर्यादित बजेट आणि टीम", "जलद लॉन्चचा ताण", "स्पष्ट रोडमॅपचा अभाव"],
                icon: BrainCircuit
            },
            growthStage: {
                title: "वाढीच्या अडचणी",
                items: ["सिस्टीम्स आणि इन्फ्रास्ट्रक्चर स्केल करणे", "ग्राहक मिळवणे आणि टिकवणे", "अंतर्गत प्रक्रिया उभारणे", "GST, कायदेशीर आणि कंप्लायंस बाबी"],
                icon: TrendingUp
            },
            marketPressure: {
                title: "स्पर्धात्मक आणि बाजाराचा दबाव",
                items: ["वेगाने बदलणारे बाजार", "चांगले निधी असलेले स्पर्धक", "वेग आणि नावीन्यपूर्णतेची गरज"],
                icon: Goal
            },
        },
        challengeConclusion: "आमची सोल्युशन्स स्टार्टअप्सना गोंधळाच्या जागी स्पष्टता आणि अव्यवस्थेच्या जागी संरचना देतात.",
        howTitle: "आम्ही स्टार्टअप्सना कसे सक्षम करतो",
        howPoints: [
            {
                step: "1️⃣",
                title: "कल्पना पडताळणी आणि मजबूत पाया",
                description: "मोठ्या गुंतवणुकीपूर्वी, स्टार्टअप्सनी खात्री केली पाहिजे की ते वास्तविक समस्येसाठी योग्य समाधान तयार करत आहेत.",
                items: ["मार्केट रिसर्च", "प्रोडक्ट-मार्केट फिट", "व्यवसाय मॉडेल", "MVP नियोजन"],
                result: "परिणाम: स्पष्टता, आत्मविश्वास आणि एक ठोस धोरणात्मक पाया।",
                imageId: "startup_validate_idea"
            },
            {
                step: "2️⃣",
                title: "स्केलेबल प्रोडक्ट विकास",
                description: "आम्ही प्रमाणित कल्पनांना वाढीसाठी डिझाइन केलेल्या विश्वसनीय, उच्च-कार्यक्षमता असलेल्या डिजिटल उत्पादनांमध्ये रूपांतरित करतो.",
                items: ["वेब आणि मोबाइल डेव्हलपमेंट", "स्केलेबल आर्किटेक्चर", "UI/UX डिझाइन", "सुरक्षित क्लाउड सिस्टीम"],
                result: "परिणाम: लॉन्च-तयार उत्पादने जी पुन्हा काम न करता वाढू शकतात।",
                imageId: "startup_build_product"
            },
            {
                step: "3️⃣",
                title: "ग्रोथ आणि मार्केट एन्ट्री",
                description: "उत्पादन लॉन्च करणे ही केवळ सुरुवात आहे। आम्ही स्टार्टअप्सना आकर्षण मिळविण्यात आणि मोजण्यायोग्य वाढ साधण्यास मदत करतो।",
                items: ["गो-टू-मार्केट रणनीती", "ब्रँडिंग आणि डिजिटल मार्केटिंग", "परफॉर्मन्स ट्रॅकिंग"],
                result: "परिणाम: जलद वाढ, वास्तविक वापरकर्ते आणि टिकाऊ वाढ।",
                imageId: "startup_growth_market"
            },
            {
                step: "4️⃣",
                title: "स्केल आणि गुंतवणूक तयारी",
                description: "जसजसे स्टार्टअप्स परिपक्व होतात, तसतसे त्यांना स्केल, ऑडिट आणि गुंतवणूकदारांच्या तपासणीसाठी तयार असणे आवश्यक आहे.",
                items: ["कंप्लायंस तयारी", "फायनान्शियल मॉडेलिंग", "पिच डेक आणि फंडिंग सपोर्ट"],
                result: "परिणाम: गुंतवणूकदार-तयार स्टार्टअप्स ज्यात दीर्घकालीन स्केलेबिलिटी आहे।",
                imageId: "startup_scale_invest"
            }
        ],
        solutionsTitle: "स्टार्टअप्ससाठी तयार केलेली सोल्युशन्स",
        solutions: [
            { icon: Cog, title: "रॅपिड MVP डेव्हलपमेंट", description: "आधुनिक टेक स्टॅकसह वेगवान MVP बिल्ड्स.", features: { title: "समाविष्ट", items: ["वैशिष्ट्य प्राधान्यक्रम", "प्रारंभिक वापरकर्ता अभिप्राय", "बाजारात जलद प्रवेश"] } },
            { icon: Cloud, title: "स्केलेबल क्लाउड आर्किटेक्चर", description: "सुरक्षित आणि कार्यक्षमता-ऑप्टिमाइझ केलेली क्लाउड पायाभूत सुविधा.", features: { title: "समाविष्ट", items: ["ऑटो-स्केलिंग प्रणाली", "मल्टी-क्लाउड सेटअप", "भविष्य-तयार तंत्रज्ञान"] } },
            { icon: Target, title: "गो-टू-मार्केट आणि ब्रँडिंग", description: "यशस्वी प्रक्षेपणासाठी सर्वसमावेशक धोरण.", features: { title: "समाविष्ट", items: ["ब्रँड ओळख आणि संदेश", "वाढ-केंद्रित विपणन योजना", "सामग्री आणि सोशल मीडिया सेटअप"] } },
            { icon: Briefcase, title: "बिझनेस सेटअप आणि कंप्लायन्स", description: "निगमन आणि नियामक गरजांसाठी पूर्ण समर्थन.", features: { title: "समाविष्ट", items: ["कर आणि नियामक संरचना", "आर्थिक आणि ऑपरेशनल सेटअप", "स्केलसाठी अनुपालन नियोजन"] } },
        ],
        idealForTitle: "स्टार्टअप टप्प्यांसाठी डिझाइन केलेले",
        idealForItems: ["कल्पना-टप्प्यातील संस्थापक", "सुरुवातीच्या टप्प्यातील स्टार्टअप्स", "उत्पादन आणि टेक स्टार्टअप्स", "SaaS आणि डिजिटल प्लॅटफॉर्म", "फंडिंग किंवा विस्तारासाठी तयारी करणारे संस्थापक"],
        resultTitle: "तुमच्या स्टार्टअपसाठी अंतिम परिणाम",
        resultItems: ["स्पष्ट धोरणात्मक दिशा", "जलद आणि स्मार्ट अंमलबजावणी", "कमी जोखीम आणि पुनर्काम", "मजबूत तंत्रज्ञान आणि उत्पादन पाया", "गुंतवणूकदार आणि स्केलसाठी सज्जता", "शाश्वत, दीर्घकालीन वाढ"],
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
            {solution.features && (
                <div>
                    <h4 className="font-semibold mb-2">{solution.features.title}</h4>
                    <ul className="space-y-2">
                        {solution.features.items.map((item: string, j: number) => (
                            <li key={j} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    )
};


export default function ForStartupsPage() {
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
