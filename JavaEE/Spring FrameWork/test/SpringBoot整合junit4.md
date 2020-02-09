# Spring Boot 整合Junit 4

```java
package cn.utrust.fintech.ccs.service;

import cn.utrust.fintech.ccs.data.tables.records.EqbRegisterInfoRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class EqbSignServiceTest {
    @Resource
    private EqbSignService eqbSignService;

    @Test
    public void testEqbInit(){
        EqbRegisterInfoRecord register = eqbSignService.getPersonalRegister("340121199807131754", "张三");
        System.out.println(register);
    }
}
```

