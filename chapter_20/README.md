# 第二十章 策略模式

策略模式：定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会随着客户端的变化而变化。

*   01.js - 策略模式(表单验证)

策略模式最主要的特色是创建了一系列策略算法，每组算法处理的业务都是相同的，只是处理过程和处理的结果不一样，所以他们又是可以相互替换的，这样就解决了算法与使用者之间的耦合。在测试层面上讲，由于每组相互之间的独立性，该模式更方便对每组算法进行单元测试，保证算法的质量。